import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../util/images/logo.gif";
import "../css/home.css";
import { runCommand } from "../util/extractFromExcel";

function HomePage(props) {
  return (
    <div className="home-container">
      <h1>Welcome to Court Reporter Pro</h1>
      <img src={logo} alt="" width="200px" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NavLink exact to="/signup">Sign Up</NavLink>
        <br />
        <NavLink exact to="/practice">Log In</NavLink>
        <br />
        <NavLink exact to="/admin">Admin</NavLink>
        {/* <button onClick={runCommand}>Extract</button> */}
      </div>
    </div>
  );
}

export default HomePage;
