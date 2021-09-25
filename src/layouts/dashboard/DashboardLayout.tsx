import React, { ReactNode } from "react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

import { CssBaseline, Toolbar } from "@mui/material";

interface Props {
  children?: ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const [isMobileNavOpen, setMobileNavOpen] = React.useState(false);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <TopNav onMobileNavOpen={() => setMobileNavOpen(true)} />
        <Sidebar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <main>
          <Toolbar />
          {props.children}
        </main>
      </React.Fragment>
    </div>
  );
}
