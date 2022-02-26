import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// PAGES
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AccountSettingsPage from './pages/AccountSettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/settings" element={<AccountSettingsPage />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
