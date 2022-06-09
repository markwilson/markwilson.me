import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";

const useStyles = makeStyles(() => ({
  headshot: {
    borderRadius: "50%",
  },
}));

const Headshot = () => {
  const classes = useStyles();

  return (
    <Image
      color="transparent"
      style={{ width: 200, height: 200, paddingTop: 200 }}
      src="portrait.jpg"
      alt="Headshot of Mark"
      className={classes.headshot}
    />
  );
};

export default Headshot;
