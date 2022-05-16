import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyle from "./../constants/styles";

type Props = {
  to: string;
  label: string;
};

const MyNavBar = ({ to, label }: Props) => {
  const classes = useStyle();
  return (
    <div className={classes.barContainer}>
      <Typography className={classes.netflixText}>MEMETFLIX</Typography>
      <Link to={to}>
        <Button className={classes.button} variant="contained">
          {label}
        </Button>
      </Link>
    </div>
  );
};

export default MyNavBar;
