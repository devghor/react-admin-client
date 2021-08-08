import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { LoaderContext } from "../../contexts/LoaderContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LinearIndeterminate() {
  const [isOpen] = useContext(LoaderContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress
        style={{ display: !isOpen ? "none" : "" }}
        color="primary"
      />
    </div>
  );
}
