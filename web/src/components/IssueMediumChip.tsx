import { Medium } from "../../../shared/medium";
import { Chip } from "@mui/material";
import { blue, purple, teal, yellow, lime, brown } from '@mui/material/colors';

import React from "react";

export function IssueMediumChip(props: { value: Medium, ml?: number }): JSX.Element {
    const typeToColor: { [key in Medium]: string } = {
        "Script": purple[500],
        "LearnApp": blue[500],
        "OnlineTest": teal[500],
        "Podcast": yellow[800],
        "SampleExam": lime[700],
        "Vodcast": brown[500]
    }
    const color = typeToColor[props.value];
    return (
      <Chip sx={{borderColor: color, color: color, ml: props.ml ?? 0}} variant="outlined" label={props.value}/>
    )
}
