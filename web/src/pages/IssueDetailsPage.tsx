import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../api/api";
import { useParams } from "react-router-dom";
import React from "react";
import { Issue } from "../../../shared/issue";
import { ErrorAlert } from "../components/ErrorAlert";
import { IssueStateChip } from "../components/IssueStateChip";
import { IssueTypeChip } from "../components/IssueTypeChip";
import { State } from "../../../shared/state";
import { useIsAdminOrTutor } from "../hooks/useRole";
import { Comments } from "../components/Comments";
import { UserName } from "../components/UserName";
import { toLocalDateTime } from "../formatter/date-time-formatter";
import { Dash } from "../infrastructure/special-characters";
import { useAuthentication } from "../hooks/useAuthentication";

export function IssueDetailsPage() {
    const {user} = useAuthentication();
    const queryClient = useQueryClient();
    const isAdminOrTutor = useIsAdminOrTutor();
    const {id} = useParams<{ id: string }>();
    const {data, isLoading, error} = useQuery('issueDetails', () => api.getIssueDetails(id));
    const updateIssue = useMutation((update: Issue) => api.updateIssue(update), {onSuccess: () => queryClient.invalidateQueries('issueDetails')});

    if (error) {
        return (
          <ErrorAlert msg="Could not load details for Issue"/>
        )
    }

    if (isLoading || !data) {
        return (
          <CircularProgress/>
        )
    }

    const nextState = data.state === "Open" ? "Closed" : "Open";
    const toggleIssueState = (newState: State) => updateIssue.mutate({...data, ...{state: newState}});

    const assignToMe = () => updateIssue.mutate({...data, ...{assignee: user}});

    return (
      <>
          <Paper elevation={2}>
              <Box padding={4}>
                  <Box mb={2} display="flex" flexDirection="row">
                      <IssueTypeChip value={data.type}/>
                      <Box ml={1}>
                          <IssueStateChip value={data.state}/>
                      </Box>
                  </Box>
                  <Typography variant="h3">#{data.id} {Dash} {data.title}</Typography>
                  <Typography variant="overline">
                      Created: {toLocalDateTime(data.createdAt)} {Dash} Last updated: {toLocalDateTime(data.updatedAt)}
                  </Typography>
                  <Box display="flex" flexDirection="column">
                      <Typography variant="overline">Reporter: <UserName user={data.reporter}/></Typography>
                      <Typography variant="overline">Assignee: <UserName user={data.assignee}/></Typography>
                      {isAdminOrTutor && <Box>
                          <Button disabled={updateIssue.isLoading} onClick={assignToMe} size="small" variant="outlined">Assign to me</Button>
                      </Box>}
                  </Box>
                  <Box my={4}>
                      <Typography variant="body1">{data.description}</Typography>
                  </Box>
                  {isAdminOrTutor &&
                      <Box marginTop={6} display="flex" flexDirection="row">
                          <Box width={130}>
                              <Button disabled={updateIssue.isLoading} variant="contained" color="primary"
                                      onClick={() => toggleIssueState(nextState)}>{nextState === "Open" ? "Open" : "Close"} Issue</Button>
                          </Box>
                          <Box marginLeft={2}>
                              <Button variant="contained" color="warning"
                                      disabled={data.state === "Rejected" || updateIssue.isLoading}
                                      onClick={() => toggleIssueState("Rejected")}>Reject Issue</Button>
                          </Box>
                      </Box>
                  }
              </Box>
          </Paper>
          <Box mt={2}>
              <Comments issue={data}/>
          </Box>
      </>
    )
}