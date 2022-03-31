import React from "react";
import logo from "../util/images/logo.gif";
import "../css/home.css";

function HomePage(props) {
  return (
    <div className="home-container">
      <h1>Welcome to Court Reporter Pro</h1>
      <img src={logo} alt="" width="200px" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <a href="/sign-up">Sign Up</a>
        <br />
        <a href="/log-in">Log In</a>
        <br />
        <a href="/admin">Admin</a>
      </div>
    </div>
  );
}

export default HomePage;
