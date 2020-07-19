import React, { MouseEventHandler } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

interface MessageFormDialogProps {
  open: boolean;
  onClose: MouseEventHandler;
  triggerClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
}));

const MessageFormDialog = ({
  open,
  onClose,
  triggerClose,
}: MessageFormDialogProps) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.root}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <form onSubmit={() => alert("TODO")}>
        <DialogTitle id="simple-dialog-title">
          Send a message to Mark
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              variant="outlined"
              color="secondary"
              autoFocus
              label="Name"
              type="text"
              fullWidth
            />
            <TextField
              variant="outlined"
              color="secondary"
              label="Email address"
              type="email"
              fullWidth
            />
            <TextField
              variant="outlined"
              color="secondary"
              multiline
              label="Message"
              rowsMax={4}
              fullWidth
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            disableRipple
            disableElevation
            onClick={() => triggerClose()}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => alert("TODO")}
            color="primary"
            variant="contained"
            disableRipple
            disableElevation
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MessageFormDialog;
