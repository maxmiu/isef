import { Box } from "@mui/material";
import { DataGrid, GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import { State } from "../../../shared/state";
import { IssueStateChip } from "./IssueStateChip";
import { Type } from "../../../shared/type";
import { IssueTypeChip } from "./IssueTypeChip";
import React from "react";
import { Issue } from "../../../shared/issue";
import { User } from "../../../shared/user";
import { useNavigate } from "react-router-dom";

type IssuesTableProps = {
    issues: Issue[]
}

export function IssuesTable(props: IssuesTableProps) {
    const navigate = useNavigate();

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
            headerAlign: "center",
            field: "createdAt",
            headerName: "Created",
            width: 100,
            valueFormatter: (params) => new Date(params.value as string).toLocaleDateString("de-de")
        },
        {
            headerAlign: "center",
            field: "updatedAt",
            headerName: "Updated",
            width: 100,
            valueFormatter: (params) => new Date(params.value as string).toLocaleDateString("de-de")
        },
        {field: "reporter", headerName: "Reporter", width: 160, renderCell: ReporterCell},
        {field: "description", headerName: "Description", width: 250},
    ]

    return (
      <Box height={800} width="100%">
          <DataGrid columns={columns}
                    style={{"cursor": "pointer"}}
                    onRowClick={(e) => navigate(`issues/${e.id}`)}
                    rows={props.issues}
                    autoPageSize
                    hideFooterSelectedRowCount
                    checkboxSelection={false}
                    disableColumnMenu
                    disableSelectionOnClick/>
      </Box>
    )
}

const ReporterCell = (props: GridRenderCellParams<User>) => (
  <a onClick={e => e.preventDefault()} href={`mailto:${props.value?.email}`}>{props.value?.name}</a>
)
