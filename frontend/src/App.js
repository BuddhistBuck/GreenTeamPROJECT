/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/context";
import Router from "./util/router";

/**
 * @component The main React App container
 */
export default function App() {
  let darkTheme = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).darkTheme
    : false;

  // Set background to grey if dark theme is enabled
  if (darkTheme) {
    document.body.style.backgroundColor = "#454545";
  } else {
    document.body.style.backgroundColor = "white";
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}
