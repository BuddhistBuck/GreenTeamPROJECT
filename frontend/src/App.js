/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { AuthProvider } from "./context/context";
import PrivateRoute from "./util/privateRoute";
import PublicRoute from "./util/publicRoute";

// User Page
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import LoginPage from "./pages/LoginPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import ManageListsPage from "./pages/admin/ManageListsPage";
import ManageUsersPage from "./pages/admin/ManageUsersPage";

export default function App() {
  const isUser = () => {
    if (localStorage.getItem("currentUser")) {
      return true;
    } else {
      return false;
    }
  };

  const isAdmin = () => {
    if (localStorage.getItem("currentAdmin")) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path="/" isAuthenticated={!isUser}>
            <HomePage />
          </PublicRoute>
          <PublicRoute exact path="/login" isAuthenticated={!isUser}>
            <LoginPage />
          </PublicRoute>
          <PrivateRoute exact path="/practice" isAuthenticated={isUser}>
            <PracticePage />
          </PrivateRoute>
          <PrivateRoute exact path="/account" isAuthenticated={isUser}>
            <AccountSettingsPage />
          </PrivateRoute>

          {/* Admin Routes */}
          <PublicRoute exact path="/admin" isAuthenticated={!isAdmin}>
            <AdminLoginPage />
          </PublicRoute>
          <PrivateRoute
            exact
            path="/admin/documentation"
            isAuthenticated={isAdmin}
          >
            <AdminHomePage />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/admin/lists"
            isAuthenticated={isAdmin}
          >
            <ManageListsPage />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/admin/users"
            isAuthenticated={isAdmin}
          >
            <ManageUsersPage />
          </PrivateRoute>

          {/* Page Not Found Route */}
          <PublicRoute exact path="/*">
            <NotFoundPage />
          </PublicRoute>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}
