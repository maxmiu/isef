import React from "react";
import { Box, Typography } from "@mui/material";
import { version } from "../version";
import LogoIcon from "./../assets/logo_icon.png";

export function Footer() {
    return (
      <Box bgcolor="#f4f5f7"
           py={2}
           maxHeight="55px"
           position="absolute"
           bottom={0}
           width="100%"
           display="flex"
           alignItems="center"
           justifyContent="center">
          <Box mx={1}>
              <img src={LogoIcon} height="20px" width="20px" alt="Logo Icon"/>
          </Box>
          <Typography variant="caption">Developed by Alex, Fabio, Max, Michael & Simon — {version}</Typography>
      </Box>
    )
}