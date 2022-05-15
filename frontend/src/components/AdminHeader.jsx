/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { logoutAdmin, useAuthDispatch } from "../context";
import "../css/adminHeader.css";

/**
 * @component The component for the admin-side header
 */
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useAuthDispatch();
  let history = useHistory();

  function logout() {
    logoutAdmin(dispatch);
    history.push("/admin");
  }

  useEffect(() => {
    if (localStorage.getItem("currentAdmin")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <div className="admin-header">
      <a href="/admin">
        <h2>
          Court Reporter Pro <span> | Admin Dashboard</span>
        </h2>
      </a>
      {isLoggedIn ? (
        <a onClick={logout}>
          <h2>
            <span style={{ fontSize: "16px" }}>Sign Out</span>
          </h2>
        </a>
      ) : (
        <a href="/">
          <h2>
            <span style={{ fontSize: "16px" }}>Back To Home</span>
          </h2>
        </a>
      )}
    </div>
  );
}

export default Header;
