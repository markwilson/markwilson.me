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
  buttonContainer: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  contactBtn: {
    marginRight: theme.spacing(2),
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

            <div className={classes.buttonContainer}>
              {/* <Button
                className={classes.contactBtn}
                variant="contained"
                color="primary"
                onClick={() => setMessageDialogOpen(true)}
                size="small"
                disableRipple
                disableElevation
              >
                Message me
              </Button> */}
              <Button
                variant="contained"
                href="https://github.com/markwilson"
                size="small"
                disableRipple
                disableElevation
              >
                GitHub: markwilson
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
