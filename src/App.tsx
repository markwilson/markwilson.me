import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Headshot from "./components/Headshot";
import Biography from "./components/Biography";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3rem",
  },
  contactBtn: {
    // TODO: this happens at a different time to the grid resize
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item md={3}>
          <Headshot />
        </Grid>

        <Grid item md={6}>
          <Biography />

          <div className={classes.contactBtn}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("TODO")}
            >
              Message me
            </Button>
          </div>
        </Grid>

        <Grid item md={9} xs={12}>
          <h3>Projects</h3>
          <ul>
            <li>
              <a href="https://weighttracking.app">Weight Tracking app</a>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
