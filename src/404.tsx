import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "6rem",
    textAlign: "center",
  },
  header: {
    marginBottom: "2rem",
  },
  button: {
    marginTop: "2rem",
  },
}));

const PageNotFound = () => {
  const [redirectProgress, setRedirectProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (redirectProgress >= 100) {
        clearInterval(timer);
        window.location.href = "/";
        return;
      }

      setRedirectProgress(redirectProgress + 2.5);
    }, 250);

    return () => {
      clearInterval(timer);
    };
  });

  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Typography variant="h1" className={classes.header}>
        Page not found
      </Typography>

      <Typography variant="caption">Redirecting to markwilson.me</Typography>
      <LinearProgress variant="determinate" value={redirectProgress} />

      <Button
        className={classes.button}
        variant="contained"
        href="/"
        color="primary"
        size="small"
        disableRipple
        disableElevation
      >
        Go to markwilson.me
      </Button>
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageNotFound />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

export default null;
