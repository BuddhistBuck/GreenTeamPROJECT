import React from "react";
import { Route, Switch } from "react-router-dom";

// Import User Pages
import HomePage from "../pages/HomePage";
import PracticePage from "../pages/PracticePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AccountSettingsPage from "../pages/AccountSettingsPage";
import ResetPassword from "../pages/ResetPassword";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import NotFoundPage from "../pages/NotFoundPage";
import NewPassword from "../pages/NewPassword";

// Import Admin Pages
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import ManageListsPage from "../pages/admin/ManageListsPage";
import ViewUsersPage from "../pages/admin/ViewUsersPage";
import ViewLogsPage from "../pages/admin/ViewLogsPage";

// Load user/admin tokens
const userToken = localStorage.getItem("currentUser");
const adminToken = localStorage.getItem("currentAdmin");

/**
 * @component Redirect to admin pages if an admin token is detected
 **/
const AdminPrivateRoute = ({ component, ...options }) => {
  const finalComponent = adminToken ? component : AdminLoginPage;
  return <Route {...options} component={finalComponent} />;
};

/**
 * @component Redirect to user pages if an user token is detected
 **/
const UserPrivateRoute = ({ component, ...options }) => {
  const finalComponent = userToken ? component : LoginPage;
  return <Route {...options} component={finalComponent} />;
};

const Router = () => (
  <Switch>
    {/* User Routes */}
    <Route exact path="/" component={userToken ? PracticePage : HomePage} />
    <Route exact path="/signup" component={SignUpPage} />
    <Route exact path="/forgot-password" component={ForgotPasswordPage} />
    <Route exact path="/new-password" component={NewPassword} />
    <Route exact path="/reset-password" component={ResetPassword} />

    <UserPrivateRoute exact path="/practice" component={PracticePage} />
    <UserPrivateRoute exact path="/account" component={AccountSettingsPage} />

    {/* Admin Routes */}
    <AdminPrivateRoute
      exact
      path="/admin"
      component={adminToken ? AdminHomePage : AdminLoginPage}
    />
    <AdminPrivateRoute
      exact
      path="/admin/documentation"
      component={AdminHomePage}
    />
    <AdminPrivateRoute exact path="/admin/lists" component={ManageListsPage} />
    <AdminPrivateRoute exact path="/admin/users" component={ViewUsersPage} />
    <AdminPrivateRoute exact path="/admin/logs" component={ViewLogsPage} />
    <Route path="/*" component={NotFoundPage} />
  </Switch>
);

export default Router;
