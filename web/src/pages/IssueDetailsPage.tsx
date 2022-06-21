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
import { useRole } from "../hooks/useRole";
import { Comments } from "../components/Comments";
import { UserName } from "../components/UserName";

export function IssueDetailsPage() {
    const queryClient = useQueryClient();
    const {role} = useRole();
    const {id} = useParams<{ id: string }>();
    const {data, isLoading, error} = useQuery('issueDetails', () => api.getIssueDetails(id));
    const updateIssue = useMutation((update: Issue) => api.updateIssue(update), {onSuccess: () => queryClient.invalidateQueries('issueDetails')});

    if (error) {
        return (
          <ErrorAlert msg="Could not load details for Ticket"/>
        )
    }

    if (isLoading || !data) {
        return (
          <CircularProgress/>
        )
    }

    const nextState = data.state === "Open" ? "Closed" : "Open";
    const toggleIssueState = (newState: State) => updateIssue.mutate({...data, ...{state: newState}});

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
                  <Typography variant="h3">{data.title}</Typography>
                  <Box mt={2}>
                      <Typography variant="h5">Reporter: <UserName user={data.reporter}/></Typography>
                  </Box>
                  <Box my={2}>
                      <Typography variant="h5">Description:</Typography>
                  </Box>
                  <Typography variant="body2">{data.description}</Typography>
                  {role === "Admin" &&
                      <Box marginTop={6} display="flex" flexDirection="row">
                          <Box width={130}>
                              <Button variant="contained" color="primary"
                                      onClick={() => toggleIssueState(nextState)}>{nextState === "Open" ? "Open" : "Close"} Issue</Button>
                          </Box>
                          <Box marginLeft={2}>
                              <Button variant="contained" color="warning"
                                      disabled={data.state === "Rejected"}
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