import React, {
  MouseEventHandler,
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Link from "@material-ui/core/Link";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

interface MessageFormDialogProps {
  open: boolean;
  onClose: MouseEventHandler;
  triggerClose: () => void;
  triggerSend: (data: { name: string; email: string; message: string }) => void;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  ts_and_cs: {
    textAlign: "center",
  },
}));

const MessageFormDialog = ({
  open,
  onClose,
  triggerClose,
  triggerSend,
}: MessageFormDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  }) as [FormData, (arg0: FormData) => void];

  const classes = useStyles();

  const createOnChangeHandler = (fieldName: string) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [fieldName]: event.target.value,
      } as FormData);
    };
  };

  return (
    <Dialog
      className={classes.root}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          triggerSend(formData);
        }}
      >
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
              onChange={createOnChangeHandler("name")}
            />
            <TextField
              variant="outlined"
              color="secondary"
              label="Email address"
              type="email"
              fullWidth
              onChange={createOnChangeHandler("email")}
            />
            <TextField
              variant="outlined"
              color="secondary"
              multiline
              label="Message"
              rowsMax={4}
              fullWidth
              onChange={createOnChangeHandler("message")}
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
            color="primary"
            variant="contained"
            disableRipple
            disableElevation
            type="submit"
          >
            Send
          </Button>
        </DialogActions>
        <DialogContent className={classes.ts_and_cs}>
          <DialogContentText variant="caption">
            This site is protected by reCAPTCHA and the Google{" "}
            <Link href="https://policies.google.com/privacy" color="secondary">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="https://policies.google.com/terms" color="secondary">
              Terms of Service
            </Link>{" "}
            apply.
          </DialogContentText>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default MessageFormDialog;
