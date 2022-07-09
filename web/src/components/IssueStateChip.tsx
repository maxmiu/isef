import { State } from "../../../shared/state";
import { Chip } from "@mui/material";
import React from "react";

export function IssueStateChip(props: { value: State, ml?: number }): JSX.Element {
    const typeToColor: { [key in State]: "info" | "warning" | "default" } = {
        "Open": "info",
        "Rejected": "warning",
        "Closed": "default",
    }
    return (
      <Chip sx={{ml: props.ml ?? 0}} color={typeToColor[props.value]} label={props.value}/>
    )
}
