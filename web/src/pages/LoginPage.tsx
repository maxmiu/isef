import { Box, Button, Card, CardContent, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MicrosoftIcon from "./../assets/microsoft.svg";
import IssueTrackerLogo from "./../assets/logo.png";
import { useAuthentication } from "../hooks/useAuthentication";

export function LoginPage() {
    const navigate = useNavigate();
    const {login} = useAuthentication();

    const signIn = () => login().then(() => navigate("/"));

    return (
      <Box display="flex" justifyContent="center" alignContent="center" marginTop="10%">
          <Card elevation={4}>
              <CardContent>
                  <Box borderRadius={2}
                       paddingX={10}
                       paddingY={2}
                       display="flex" justifyContent="center">
                      <img src={IssueTrackerLogo} alt=""/>
                  </Box>
                  <Box display="flex" alignItems="center" flexDirection="column" marginTop={5}>
                      <Typography variant="h5">Sign in with</Typography>
                      <Box marginTop={2} display="flex" justifyContent="center">
                          <Button color={"secondary"}
                                  startIcon={<img src={MicrosoftIcon} alt="Microsoft Logo"/>}
                                  variant="contained"
                                  onClick={signIn} type="submit">
                              Microsoft
                          </Button>
                      </Box>
                  </Box>
              </CardContent>
          </Card>
      </Box>
    )
}