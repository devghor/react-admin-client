import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ layout: Layout, page: Page, ...rest }) => {
  return (
    <div>
      <Route {...rest} exact>
        <Layout>
          <Page />
        </Layout>
      </Route>
    </div>
  );
};

export default PublicRoute;
