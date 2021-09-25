import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import Router from "./router";
import { I18nProvider, LOCALES } from "./plugins/i18n";
import OverlayLoader from "./components/loaders/OverlayLoader";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Toaster } from "react-hot-toast";

require("dotenv").config();

export default function App() {
  const loader = useSelector((state: RootState) => state.loader.open);

  return (
    <React.Fragment>
      <I18nProvider locale={LOCALES.ENGLISH}>
        <Toaster />
        <OverlayLoader open={loader} />
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </I18nProvider>
    </React.Fragment>
  );
}
