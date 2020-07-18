import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: "2em",
  },
}));

const Biography = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Mark Wilson</Typography>
      <Typography variant="h2">
        Software Engineer &amp; Engineering Lead
      </Typography>
    </div>
  );
};

export default Biography;
