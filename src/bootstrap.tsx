import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import App from "./App";
import theme from "./theme";

export default () =>
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
