import React, { useState, MouseEventHandler } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

interface MessageFormDialogProps {
  open: boolean;
  onClose: MouseEventHandler;
  triggerClose: () => void;
}

const MessageFormDialog = ({ open, onClose, triggerClose }: MessageFormDialogProps) => (
  <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
    <form onSubmit={() => alert("TODO")}>
      <DialogTitle id="simple-dialog-title">Send a message</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField autoFocus label="Name" type="text" fullWidth />
          <TextField label="Email address" type="email" fullWidth />
          <TextField multiline label="Message" rowsMax={4} fullWidth />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => triggerClose()} variant="contained">
          Cancel
        </Button>
        <Button
          onClick={() => alert("TODO")}
          color="primary"
          variant="contained"
        >
          Send
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

export default MessageFormDialog;
