import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Headshot from "./components/Headshot";
import Biography from "./components/Biography";
import MessageFormDialog from "./components/MessageFormDialog";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "6rem",
  },
  contactBtn: {
    // TODO: this happens at a different time to the grid resize
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

function App() {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const classes = useStyles();

  const onMessageDialogClose = () => {
    setMessageDialogOpen(false);
  };

  return (
    <>
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
                onClick={() => setMessageDialogOpen(true)}
                size="small"
              >
                Message me
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>

      <MessageFormDialog
        open={messageDialogOpen}
        onClose={onMessageDialogClose}
        triggerClose={() => setMessageDialogOpen(false)}
      />
    </>
  );
}

export default App;
