import React from "react";

import { BrowserRouter, Switch } from "react-router-dom";

import AdminRoute from "./components/AdminRoute";
import PublicRoute from "./components/PublicRoute";
import AuthRoute from "./components/AuthRoute";

import * as layout from "../components/layouts";
import * as page from "../pages";
import { DefaultLayout,DashboardLayout } from "../layouts";
import { pathValue } from "../values";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          exact
          path={pathValue.HOME}
          page={page.Dashboard}
          layout={DashboardLayout}
        ></PublicRoute>
        <AuthRoute
          exact
          path={pathValue.LOGIN}
          page={page.Login}
          layout={DefaultLayout}
        ></AuthRoute>
        <AdminRoute
          exact
          path={pathValue.DASHBOARD}
          page={page.Dashboard}
          layout={DashboardLayout}
        ></AdminRoute>
        <AdminRoute
          exact
          path={pathValue.USERS}
          page={page.Users}
          layout={DashboardLayout}
        ></AdminRoute>
        <AdminRoute
          exact
          path={pathValue.ROLES}
          page={page.Roles}
          layout={DashboardLayout}
        ></AdminRoute>
        <AdminRoute
          exact
          path={pathValue.PERMISSIONS}
          page={page.Permissions}
          layout={DashboardLayout}
        ></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
