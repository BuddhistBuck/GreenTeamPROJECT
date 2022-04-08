import React from "react";
import { Route, Switch } from "react-router-dom";

// User Page
import HomePage from "../pages/HomePage";
import PracticePage from "../pages/PracticePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AccountSettingsPage from "../pages/AccountSettingsPage";
import NotFoundPage from "../pages/NotFoundPage";

// Admin Pages
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import ManageListsPage from "../pages/admin/ManageListsPage";
import ManageUsersPage from "../pages/admin/ManageUsersPage";

const AdminPrivateRoute = ({ component, ...options }) => {
  const adminToken = localStorage.getItem("currentAdmin");
  const finalComponent = adminToken ? component : AdminLoginPage;
  return <Route {...options} component={finalComponent} />;
};

const UserPrivateRoute = ({ component, ...options }) => {
  const userToken = localStorage.getItem("currentUser");
  const finalComponent = userToken ? component : LoginPage;
  return <Route {...options} component={finalComponent} />;
};

const Router = () => (
  <Switch>
    {/* User Routes */}
    <Route exact path="/" component={HomePage} />
    <Route exact path="/signup" component={SignUpPage} />
    <UserPrivateRoute exact path="/practice" component={PracticePage} />
    <UserPrivateRoute exact path="/account" component={AccountSettingsPage} />

    {/* Admin Routes */}
    <AdminPrivateRoute exact path="/admin" component={AdminLoginPage} />
    <AdminPrivateRoute
      exact
      path="/admin/documentation"
      component={AdminHomePage}
    />
    <AdminPrivateRoute exact path="/admin/lists" component={ManageListsPage} />
    <AdminPrivateRoute exact path="/admin/users" component={ManageUsersPage} />

    <Route path="/*" component={NotFoundPage} />
  </Switch>
);

export default Router;
