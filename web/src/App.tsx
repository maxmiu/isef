import logo from './assets/logo.png'
import './App.css'
import { Box, ThemeProvider } from '@mui/material'
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
import { QueryProvider } from './bootstrap/QueryProvider'

const msalInstance = new PublicClientApplication(msalConfig);

const privateRoutes = [
    {key: "home", to: "/", component: <IssuesPage/>},
    {key: "settings", to: "/settings", component: <SettingsPage/>},
]

function App() {
    return (
      <MsalProvider instance={msalInstance}>
          <ThemeProvider theme={theme}>
              <QueryProvider>
                  <BrowserRouter>
                      <Navbar/>
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
                  </BrowserRouter>
              </QueryProvider>
          </ThemeProvider>
      </MsalProvider>
    )
}

export default App
