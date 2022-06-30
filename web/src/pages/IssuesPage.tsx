import React, { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../api/api";
import { Issue } from "../../../shared/issue";
import { Box, CircularProgress, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { IssuesTable } from "../components/IssuesTable";
import { filterIssuesBySearchValue } from "../filters/issue-filter";
import { AddIssueButton } from "../components/AddIssueButton";

export function IssuesPage(): JSX.Element {
    const [searchValue, setSearchValue] = useState("");
    const {data, isLoading, error} = useQuery('issues', () => api.getIssue(), {initialData: []});
    const issues = data as Issue[];
    const filteredIssues = issues.filter(i => filterIssuesBySearchValue(i, searchValue));

    return (
      <>
          <Box marginY={4} width="100%" display="flex" alignItems="end">
              <AddIssueButton/>
              <Box marginLeft={7} width={400}>
                  <TextField
                    fullWidth
                    InputProps={{startAdornment: (<InputAdornment position="start"> <SearchIcon/> </InputAdornment>)}}
                    variant="standard" onChange={(e) => setSearchValue(e.target.value)}/>
              </Box>
          </Box>
          {(error || isLoading) ? <CircularProgress/> : <IssuesTable issues={filteredIssues}/>}
      </>
    )
}
