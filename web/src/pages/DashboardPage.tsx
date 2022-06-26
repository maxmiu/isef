import React from "react";
import { Box, Card, CircularProgress, Typography, useTheme } from "@mui/material";
import { useQuery } from "react-query";
import { api } from "../api/api";
import { useAuthentication } from "../hooks/useAuthentication";
import { ErrorAlert } from "../components/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { IssueTypeChip } from "../components/IssueTypeChip";
import { IssueStateChip } from "../components/IssueStateChip";
import { Issue } from "../../../shared/issue";
import { UserName } from "../components/UserName";

export function DashboardPage() {
    const {user} = useAuthentication();
    const {data, isLoading, error} = useQuery('ownIssues', () => api.getOwnIssues(user));

    if (error) {
        return (
          <ErrorAlert msg="Could not load Issues"/>
        )
    }

    if (isLoading || !data) {
        return (
          <CircularProgress/>
        )
    }

    return (
      <Box>
          <Typography variant="h4">Your work</Typography>
          {data.filter(i => i.state === "Open").map(issue => (<IssueCard issue={issue}/>))}
          <Box mt={10}>
              <Typography variant="h4">Archive</Typography>
          </Box>
          {data.filter(i => i.state !== "Open").map(issue => (<IssueCard issue={issue}/>))}
      </Box>
    )
}

function IssueCard({issue}: { issue: Issue }) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
      <Card onClick={() => navigate(`/issues/${issue.id}`)}
            style={{cursor: "pointer", padding: theme.spacing(2), marginTop: theme.spacing(2)}}>
          <Box mb={2} display="flex" flexDirection="row">
              <IssueTypeChip value={issue.type}/>
              <Box ml={1}>
                  <IssueStateChip value={issue.state}/>
              </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
              <Typography variant="body1"><b>#{issue.id}</b> {issue.title}</Typography>
              <Box>
                  <Typography>Reporter: </Typography>
                  <UserName user={issue.reporter}/>
              </Box>
          </Box>
      </Card>
    );
}