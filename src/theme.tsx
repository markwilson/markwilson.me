import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff1ff",
      main: "#e1bee7",
      dark: "#af8eb5",
      contrastText: "#000",
    },
    secondary: {
      light: "#ee98fb",
      main: "#ba68c8",
      dark: "#883997",
      contrastText: "#000",
    },
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    h2: {
      fontSize: "1.6rem",
      fontWeight: 300,
    },
    h3: {
      fontSize: "1.3rem",
      fontWeight: 400,
      textAlign: "center",
      marginBottom: "0.5em",
    },
    button: {
      fontWeight: 400,
    },
  },
});

export default theme;