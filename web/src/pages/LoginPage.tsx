import { Box, Button, Card, CardContent, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MicrosoftIcon from "./../assets/microsoft.svg";
import { useAuthentication } from "../hooks/useAuthentication";

export function LoginPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const {login} = useAuthentication();

    const signIn = () => login().then(() => navigate("/"));

    return (
      <Box display="flex" justifyContent="center" alignContent="center" marginTop="10%">
          <Card>
              <CardContent>
                  <Box borderRadius={2} paddingX={8} style={{backgroundColor: theme.palette.primary.main}}
                       display="flex" justifyContent="center">
                      <Typography variant="h3" color="#fff">Login</Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" marginTop={3}>
                      <Typography variant="body1">Not a member yet? Sign in with</Typography>
                      <Box marginTop={4} display="flex" justifyContent="center">
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