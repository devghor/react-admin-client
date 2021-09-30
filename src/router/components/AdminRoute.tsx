import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { pathValue } from "../../values";

const AdminRoute = ({ layout: Layout, page: Page, ...rest }) => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  return !loggedIn ? (
    <Redirect to={pathValue.LOGIN} />
  ) : (
    <div>
      <Route {...rest} exact>
        <Layout>
          <Page />
        </Layout>
      </Route>
    </div>
  );
};

export default AdminRoute;
