import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { StateMachineProvider } from "little-state-machine";
import { MantineProvider } from "@mantine/core";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <StateMachineProvider>
            <App />
          </StateMachineProvider>
        </Router>
      </ThemeProvider>
    </MantineProvider>
  </React.StrictMode>
);
