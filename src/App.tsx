import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Headshot from "./components/Headshot";
import Biography from "./components/Biography";
import MessageFormDialog, { FormData } from "./components/MessageFormDialog";

import axios, { AxiosError } from "axios";

import "./App.css";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
  paper: {
    display: "inline-block",
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    textAlign: "left",
  },
  buttonContainer: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  contactBtn: {
    margin: theme.spacing(1),
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
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={4}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Headshot />
            </Grid>

            <Grid item>
              <Biography />

              <div className={classes.buttonContainer}>
                <Button
                  className={classes.contactBtn}
                  variant="contained"
                  color="primary"
                  onClick={() => setMessageDialogOpen(true)}
                  size="small"
                  disableRipple
                  disableElevation
                >
                  Message me
                </Button>
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
        </Paper>
      </Container>

      <MessageFormDialog
        open={messageDialogOpen}
        onClose={onMessageDialogClose}
        triggerClose={() => setMessageDialogOpen(false)}
        triggerSend={(
          formData: FormData,
          onError: (message: string) => void,
          onSuccess: () => void,
        ) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              // TODO: move this to environment variable
              .execute("6LdHF7YZAAAAACz4OTPzk2pIL0DinVK36DuTcBf_", {
                action: "submit",
              })
              .then((token: string) => {
                axios
                  .post(process.env.REACT_APP_SEND_MESSAGE_URL!, {
                    token,
                    formData,
                  })
                  .then(() => {
                    onSuccess();
                  })
                  .catch((error: AxiosError) => {
                    if (!error.response) {
                      onError(error.toString())
                      throw error;
                    }

                    onError(error.response.data);
                  });
              });
          });
        }}
      />
    </>
  );
}

export default App;
