/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/context";
import Router from "./util/router";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}
