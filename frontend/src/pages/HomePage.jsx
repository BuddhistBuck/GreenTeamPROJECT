import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../util/images/logo.gif";
import "../css/home.css";
// import { runCommand } from "../util/extractFromExcel";

/**
 * @component The component that is rendered upon visiting the site
 */
function HomePage(props) {
  return (
    <div className="home-container">
      <h1>Welcome to Court Reporter Pro</h1>
      <img src={logo} alt="" width="200px" />
      <div
        style={{ display: "flex", flexDirection: "column", padding: "20px" }}
      >
        <NavLink exact to="/signup">
          Sign Up
        </NavLink>
        <div className="home-vertical-spacing" />
        <NavLink exact to="/practice">
          Log In
        </NavLink>
        <div className="home-vertical-spacing" />
        <NavLink exact to="/admin" id="admin-link">
          Admin
        </NavLink>
        {/* <button onClick={runCommand}>Extract</button> */}
      </div>
    </div>
  );
}

export default HomePage;
