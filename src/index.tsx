import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});

theme.typography.h1 = {
  fontSize: "2rem",
  fontWeight: 400,
};
theme.typography.h2 = {
  fontSize: "1.6rem",
  fontWeight: 300,
};
theme.typography.h3 = {
  fontSize: "1.3rem",
  fontWeight: 400,
  textAlign: "center",
  marginBottom: "0.5em",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
