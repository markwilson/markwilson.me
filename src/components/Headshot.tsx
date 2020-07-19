import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(() => ({
  headshot: {
    width: 200,
    height: 200,
  },
}));

const Headshot = () => {
  const classes = useStyles();

  // TODO: this should use the Image component
  return (
    <Avatar
      src="portrait.jpg"
      alt="Headshot of Mark"
      className={classes.headshot}
    />
  );
};

export default Headshot;
