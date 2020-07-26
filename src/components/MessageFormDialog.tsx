import React, {
  MouseEvent,
  MouseEventHandler,
  ChangeEvent,
  FocusEvent,
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

export interface FormData {
  name: string | null;
  email: string | null;
  message: string | null;
}

interface MessageFormDialogProps {
  open: boolean;
  onClose: MouseEventHandler;
  triggerClose: () => void;
  triggerSend: (
    data: FormData,
    onError: (message: string) => void,
    onSuccess: () => void
  ) => void;
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
  const [formData, setFormData] = useState<FormData>({
    name: null,
    email: null,
    message: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const classes = useStyles();

  const createOnChangeHandler = (fieldName: keyof FormData) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [fieldName]: event.target.value,
      });
    };
  };

  const createOnFocusHandler = (fieldName: keyof FormData) => {
    return (event: FocusEvent<HTMLInputElement>) => {
      if (formData[fieldName] === null) {
        setFormData({
          ...formData,
          [fieldName]: "",
        });
      }
    };
  };

  const onSuccess = () => {
    setSent(true);
    setTimeout(() => {
      triggerClose();
      setTimeout(() => {
        setIsSending(false);
        setSent(false);
        setFormData({
          name: null,
          email: null,
          message: null,
        });
      }, 500);
    }, 500);
  };

  const onError = (message: string) => {
    setError(message);
    setIsSending(false);
  };

  const errorEl = error ? (
    <DialogContentText color="error">{error}</DialogContentText>
  ) : (
    ""
  );

  const validName = !!formData.name;
  const validEmail =
    formData.email &&
    formData.email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  const validMessage = !!formData.message;

  return (
    <Dialog
      className={classes.root}
      onClose={(e: MouseEvent) => {
        if (isSending) {
          return;
        }

        setError(null);
        onClose(e);
      }}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          if (isSending || !validName || !validMessage || !validEmail) {
            return;
          }

          setError(null);
          setIsSending(true);
          triggerSend(formData, onError, onSuccess);
        }}
      >
        <DialogTitle id="simple-dialog-title">
          {sent ? "Message sent!" : "Send a message to Mark"}
        </DialogTitle>
        {!sent && (
          <>
            <DialogContent>
              {errorEl}
              <DialogContentText>
                <TextField
                  variant="outlined"
                  color="secondary"
                  autoFocus
                  label="Name"
                  type="text"
                  fullWidth
                  onChange={createOnChangeHandler("name")}
                  onFocus={createOnFocusHandler("name")}
                  disabled={isSending}
                  error={formData.name !== null && !validName}
                />
                <TextField
                  variant="outlined"
                  color="secondary"
                  label="Email address"
                  type="email"
                  fullWidth
                  onChange={createOnChangeHandler("email")}
                  onFocus={createOnFocusHandler("email")}
                  disabled={isSending}
                  error={formData.email !== null && !validEmail}
                />
                <TextField
                  variant="outlined"
                  color="secondary"
                  multiline
                  label="Message"
                  rowsMax={4}
                  fullWidth
                  onChange={createOnChangeHandler("message")}
                  onFocus={createOnFocusHandler("message")}
                  disabled={isSending}
                  error={formData.message !== null && !validMessage}
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
                disabled={isSending}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                disableRipple
                disableElevation
                type="submit"
                disabled={
                  isSending || !validName || !validMessage || !validEmail
                }
              >
                Send
              </Button>
            </DialogActions>
            <DialogContent className={classes.ts_and_cs}>
              <DialogContentText variant="caption">
                This site is protected by reCAPTCHA and the Google{" "}
                <Link
                  href="https://policies.google.com/privacy"
                  color="secondary"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="https://policies.google.com/terms"
                  color="secondary"
                >
                  Terms of Service
                </Link>{" "}
                apply.
              </DialogContentText>
            </DialogContent>
          </>
        )}
      </form>
    </Dialog>
  );
};

export default MessageFormDialog;
