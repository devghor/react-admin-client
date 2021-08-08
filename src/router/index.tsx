import React from "react";

import { BrowserRouter, Switch } from "react-router-dom";

import AdminRoute from "./components/AdminRoute";
import PublicRoute from "./components/PublicRoute";
import AuthRoute from "./components/AuthRoute";

import * as layout from "../components/layouts";
import * as page from "../pages";

import { pathValue } from "../values";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          exact
          path={pathValue.HOME}
          page={page.Home}
          layout={layout.DefaultLayout}
        ></PublicRoute>
        <AuthRoute
          exact
          path={pathValue.LOGIN}
          page={page.Login}
          layout={layout.DefaultLayout}
        ></AuthRoute>
        <AdminRoute
          exact
          path={pathValue.DASHBOARD}
          page={page.Dashboard}
          layout={layout.DashboardLayout}
        ></AdminRoute>
        <AdminRoute
          exact
          path={pathValue.USERS}
          page={page.Users}
          layout={layout.DashboardLayout}
        ></AdminRoute>
        <AdminRoute
          exact
          path={pathValue.ROLES}
          page={page.Roles}
          layout={layout.DashboardLayout}
        ></AdminRoute>
        <AdminRoute
          exact
          path={pathValue.PERMISSIONS}
          page={page.Permissions}
          layout={layout.DashboardLayout}
        ></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
