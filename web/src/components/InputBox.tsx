import React from "react";
import { Box, BoxProps } from "@mui/material";

export function InputBox(props: BoxProps) {
    return (
      <Box marginTop={2} {...props}>
          {props.children}
      </Box>
    )
}