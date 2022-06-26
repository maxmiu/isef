import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { AccountCircle, Settings } from "@mui/icons-material";
import { useRole } from "../hooks/useRole";

export function Navbar() {
    const navigate = useNavigate();
    const {role} = useRole();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {isAuthenticated, logout, user} = useAuthentication();

    if (!isAuthenticated) {
        return null;
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
      <AppBar position="fixed">
          <Container maxWidth="xl">
              <Toolbar disableGutters>
                  <Typography style={{cursor: "pointer"}} variant="h6" onClick={() => navigate("/")}
                              noWrap>Issue Tracker</Typography>
                  <MenuItem key="home" onClick={() => navigate("/")}>
                      <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem key="home" onClick={() => navigate("/issues")}>
                      <Typography textAlign="center">All Issues</Typography>
                  </MenuItem>
                  <Typography sx={{flexGrow: 1}}/>
                  <Box marginRight={1}>
                      <Typography>Hello <b>{user.name}</b> ({role})</Typography>
                  </Box>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                      <AccountCircle/>
                  </IconButton>
                  <IconButton color="inherit" onClick={() => navigate("/settings")}>
                      <Settings/>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                  >
                      <MenuItem onClick={async () => {
                          handleClose();
                          await logout();
                      }}>Logout</MenuItem>
                  </Menu>
              </Toolbar>
          </Container>
      </AppBar>
    )
}