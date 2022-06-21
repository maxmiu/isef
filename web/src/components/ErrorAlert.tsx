import { Alert } from "@mui/material";

export function ErrorAlert(props: {msg?: string}){
    return (
      <Alert severity="error">Error: {props.msg ?? "Ups! An unknown error occurred. Please try again and refresh"}</Alert>
    )
}