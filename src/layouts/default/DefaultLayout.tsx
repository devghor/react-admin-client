import React, { ReactNode } from "react";
import { CssBaseline } from "@mui/material";

interface Props {
  children?: ReactNode;
}

const DefaultLayout = (props: Props) => {
  const { children } = props;

  return (
    <div>
      <CssBaseline />
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
