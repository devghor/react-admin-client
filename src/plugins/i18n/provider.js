import React from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./locales";
import messages from './messages'
const Provider = ({ children, locale = LOCALES.BANGLA }) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default Provider;
