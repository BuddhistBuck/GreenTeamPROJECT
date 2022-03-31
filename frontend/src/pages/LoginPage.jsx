/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "../css/userLogin.css";
import { loginUser, useAuthDispatch } from "../context";
import logo from "../util/images/logo.gif";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAuthDispatch();

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    let payload = { email, password };
    e.target.reset();

    try {
      loginUser(dispatch, payload);
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div>
      <div className="user-background-image" />
      <div style={{ height: "40px" }} />
      <div className="user-login">
        <div style={{ height: "40px" }} />

        {/* img from https://www.flaticon.com/free-icon/typewriter_387124?related_id=387124&origin=tag# */}
        <img src={logo} alt="" width="150em" />

        <h3>Court Reporter Pro</h3>

        <form onSubmit={HandleFormSubmit}>
          <label htmlFor="username">
            <p>Email</p>
            <input
              type="text"
              placeholder="Enter email ..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div style={{ height: "15px" }}></div>
          <label htmlFor="email">
            <p>Password</p>
            <input
              type="text"
              placeholder="Enter password ..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div style={{ height: "15px" }}></div>
          <div style={{ textAlign: "center" }}>
            <a style={{ fontSize: "13px" }} href="/#">
              Create Account
            </a>
            &nbsp; • &nbsp;
            <a style={{ fontSize: "13px" }} href="/#">
              Forgot Password
            </a>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {errorMessage && <span className="form-error">{errorMessage}</span>}
            <button>Login</button>
          </div>
        </form>
        <div style={{ height: "60px" }} />
      </div>
      <div style={{ height: "40px" }} />

      <footer className="user-login-footer">
        <p style={{ paddingLeft: "20px" }}>Court Reporter Pro</p>
        <p style={{ paddingRight: "20px" }}>All Rights Reserved</p>
      </footer>
    </div>
  );
}
