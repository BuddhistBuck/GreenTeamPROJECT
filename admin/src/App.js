import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

// PAGES
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/ItemsPage";
import SupportPage from "./pages/SupportPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/items" element={<ItemsPage />}></Route>
        <Route path="/support" element={<SupportPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
