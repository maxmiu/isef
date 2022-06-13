import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../api/api";
import { useRole } from "../hooks/useRole";
import { InputBox } from "../components/InputBox";
import { allRoles } from "../../../shared/role";

export function SettingsPage() {
    const {role, setRole} = useRole();
    const queryClient = useQueryClient();
    const seedIssuesMutation = useMutation(() => api.seedIssues(), {onSuccess: () => queryClient.invalidateQueries('issues')});

    return (
      <Container>
          <Typography variant="h2">Settings</Typography>
          <InputBox>
              <Typography variant="h4">Seeding</Typography>
              <Box display="flex" flexDirection="row">
                  <Button variant="contained" color="primary" onClick={() => seedIssuesMutation.mutate()}>Seed</Button>
              </Box>
          </InputBox>
          <InputBox>
              <Typography variant="h4">Role</Typography>
              <Box display="flex" flexDirection="row">
                  <ButtonGroup>
                      {allRoles.map(r => (
                        <Button variant={role === r ? "contained" : "outlined"}
                                color={role === r ? "primary" : "secondary"}
                                onClick={() => setRole(r)}>{r}</Button>
                      ))}
                  </ButtonGroup>
              </Box>
          </InputBox>

      </Container>
    )
}