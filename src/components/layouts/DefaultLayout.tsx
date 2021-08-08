import React, { ReactNode } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    grow: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
    },
  })
);

interface Props {
  children?: ReactNode;
}

const DefaultLayout = (props: Props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
