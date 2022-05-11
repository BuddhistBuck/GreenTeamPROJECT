/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/context";
import Router from "./util/router";


// Stripe Secret Key: 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
// Stripe Publishable Key: pk_live_51KxdwaCQ6pAtcApypEyAsuHdFzUAXXrTfZsuGzlueoBxOQ15qoWrdgtn1zASuvuNse2j1tn7B8HzuxazcHnrhl6200RwUB7RaZ

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}
