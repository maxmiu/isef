import React, { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../api/api";
import { Issue } from "../../../shared/issue";
import { Box, Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import { DataGrid, GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import { AddIssueDialog } from "../components/AddIssueDialog";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { IssueStateChip } from "../components/IssueStateChip";
import { IssueTypeChip } from "../components/IssueTypeChip";
import { User } from "../../../shared/user";
import { State } from "../../../shared/state";
import { Type } from "../../../shared/type";

export function IssuesPage(): JSX.Element {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [showAddIssueDialog, setShowAddIssueDialog] = useState(false);
    const {data, isLoading, error} = useQuery('issues', () => api.getIssue(), {initialData: []});
    const issues = data as Issue[];
    const filteredIssues = issues.filter(i => {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        return i.title.toLowerCase().includes(lowerCaseSearchValue) ||
          i.description.toLowerCase().includes(lowerCaseSearchValue) ||
          i.course.toLowerCase().includes(lowerCaseSearchValue);
    });

    const Issues = () => {
        if (error || isLoading) {
            return (
              <CircularProgress/>
            )
        }
        const columns: GridColumns = [
            {
                field: "state",
                headerName: "State",
                width: 120,
                renderCell: (v: GridRenderCellParams<State>) => (v.value && <IssueStateChip value={v.value}/>),
                headerAlign: "center",
                align: "center"
            },
            {
                field: "type",
                headerName: "Type",
                width: 140,
                renderCell: (v: GridRenderCellParams<Type>) => (v.value && <IssueTypeChip value={v.value}/>),
                headerAlign: "center",
                align: "center"
            },
            {field: "title", headerName: "Title", width: 160},
            {field: "course", headerName: "Course", width: 100, align: "center", headerAlign: "center"},
            {
                field: "created",
                headerName: "Created",
                width: 120,
                valueFormatter: (params) => new Date(params.value as string).toLocaleDateString("de-de")
            },
            {field: "reporter", headerName: "Reporter", width: 160, renderCell: ReporterCell},
            {field: "description", headerName: "Description", width: 250},
        ]
        return (
          <Box height={800} width="100%">
              <DataGrid columns={columns}
                        style={{"cursor": "pointer"}}
                        rows={filteredIssues}
                        autoPageSize
                        hideFooterSelectedRowCount
                        checkboxSelection={false}
                        disableColumnMenu
                        disableSelectionOnClick/>
          </Box>
        )
    }

    return (
      <>
          <Box marginY={4} width="100%" display="flex" alignItems="end">
              <Button startIcon={<AddIcon/>} variant="contained" color="primary"
                      onClick={() => setShowAddIssueDialog(true)}>New Issue</Button>
              <Box marginLeft={7}>
                  <TextField
                    InputProps={{startAdornment: (<InputAdornment position="start"> <SearchIcon/> </InputAdornment>)}}
                    variant="standard" onChange={(e) => setSearchValue(e.target.value)}/>
              </Box>
          </Box>
          <Issues/>
          {showAddIssueDialog &&
          <AddIssueDialog open={showAddIssueDialog} onClose={() => setShowAddIssueDialog(false)}/>}
      </>
    )
}

const ReporterCell = (props: GridRenderCellParams<User>) => (
  <a onClick={e => e.preventDefault()} href={`mailto:${props.value?.email}`}>{props.value?.name}</a>
)
