/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { loginUser, useAuthDispatch } from "../context";
import logo from "../util/images/logo.gif";
import "../css/userLogin.css";

export default function LoginPage(props) {
  document.body.style.overflow = "hidden";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAuthDispatch();

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    let payload = { email, password };
    loginUser(dispatch, payload);
    setLoading(true);
    setInterval(() => {
      setErrorMessage("Invalid username or password.");
      setLoading(false);
    }, 8000);
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 11000);
  }, [errorMessage]);

  return (
    <>
      <div className="user-background-image" />
      <div className="user-login-top" />
      <div className="user-login">
        <div style={{ height: "40px" }} />

        {/* SOURCE: https://www.flaticon.com/free-icon/typewriter_387124?related_id=387124&origin=tag# */}
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
              type="password"
              placeholder="Enter password ..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div style={{ height: "15px" }}></div>
          <div style={{ textAlign: "center" }}>
            <a style={{ fontSize: "13px" }} href="/signup">
              Create Account
            </a>
            &nbsp; • &nbsp;
            {/* <a style={{ fontSize: "13px" }} href="/forgot-password">
              Forgot Password
            </a> */}
            <a style={{ fontSize: "13px" }} href="/">
              Back to Home
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
            {errorMessage && (
              <span className="user-form-error">{errorMessage}</span>
            )}
            <div style={{ height: "20px" }} />
            {loading ? (
              <button style={{ backgroundColor: "#5AB4B4" }}>
                Logging in ...
              </button>
            ) : (
              <button>Login</button>
            )}
          </div>
        </form>
        <div style={{ height: "60px" }} />
      </div>
      <div className="user-login-bottom" />

      <footer className="user-login-footer">
        <p style={{ paddingLeft: "20px" }}>Court Reporter Pro</p>
        <p style={{ paddingRight: "20px" }}>All Rights Reserved</p>
      </footer>
    </>
  );
}
