/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { AuthProvider } from "./context/context";
import PrivateRoute from "./util/privateRoute";
import PublicRoute from "./util/publicRoute";

// User Page
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import LoginPage from "./pages/LoginPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import ManageLists from "./pages/admin/ManageLists";
import ManageUsers from "./pages/admin/ManageUsers";
import NotFound from "./pages/NotFound";

function App() {
  const isAuthenticated = () => {
    if (localStorage.getItem("currentUser")) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" isAuthenticated={!isAuthenticated()}>
            <HomePage />
          </PrivateRoute>
          <PublicRoute exact path="/practice" isAuthenticated={isAuthenticated()}>
            <PracticePage />
          </PublicRoute>
          <PublicRoute exact path="/login">
            <LoginPage />
          </PublicRoute>
          <PublicRoute exact path="/admin">
            <AdminLogin />
          </PublicRoute>
          <PrivateRoute
            exact
            path="/account"
            isAuthenticated={isAuthenticated()}
          >
            <AccountSettingsPage />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/admin/home"
            isAuthenticated={isAuthenticated()}
          >
            <AdminHome />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/admin/manage-lists"
            isAuthenticated={isAuthenticated()}
          >
            <ManageLists />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/admin/manage-users"
            isAuthenticated={isAuthenticated()}
          >
            <ManageUsers />
          </PrivateRoute>
          <PublicRoute exact path="/*">
            <NotFound />
          </PublicRoute>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
