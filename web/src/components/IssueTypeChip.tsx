import { Chip } from "@mui/material";
import React from "react";
import { Type } from "../../../shared/type";

export function IssueTypeChip(props: {value: Type}){
    return (
      <Chip color={props.value === "Bug" ? "error" : "success"} label={props.value}/>
    )
}
