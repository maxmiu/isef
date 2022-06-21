import './App.css'
import { Box, Container, ThemeProvider } from '@mui/material'
import theme from './theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth/auth.config";
import { RequireAuth } from "./auth/RequireAuth";
import { Navbar } from "./components/Navbar";
import { IssuesPage } from "./pages/IssuesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { QueryProvider } from './infrastructure/QueryProvider'
import { RoleProvider } from "./infrastructure/RoleProvider";
import { NotificationProvider } from "./infrastructure/NotificationProvider";
import { Footer } from "./infrastructure/Footer";
import { IssueDetailsPage } from "./pages/IssueDetailsPage";

const msalInstance = new PublicClientApplication(msalConfig);

const privateRoutes = [
    {key: "home", to: "/", component: <IssuesPage/>},
    {key: "issues", to: "/issues/:id", component: <IssueDetailsPage/>},
    {key: "settings", to: "/settings", component: <SettingsPage/>},
]

function App() {
    return (
      <MsalProvider instance={msalInstance}>
          <RoleProvider>
              <ThemeProvider theme={theme}>
                  <NotificationProvider>
                      <QueryProvider>
                          <BrowserRouter>
                              <Navbar/>
                              <Container>
                                  <Box marginTop={10}>
                                      <Routes>
                                          <Route path="/login" element={<LoginPage/>}/>
                                          {privateRoutes.map((pr) => (
                                            <Route key={pr.key} path={pr.to} element={
                                                <RequireAuth>
                                                    {pr.component}
                                                </RequireAuth>
                                            }/>
                                          ))}
                                      </Routes>
                                  </Box>
                              </Container>
                          </BrowserRouter>
                      </QueryProvider>
                  </NotificationProvider>
                  <Footer/>
              </ThemeProvider>
          </RoleProvider>
      </MsalProvider>
    )
}

export default App
