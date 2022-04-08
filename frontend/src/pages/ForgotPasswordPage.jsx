import React, { useState } from "react";
import { loginUser, useAuthDispatch } from "../context";
import logo from "../util/images/logo.gif";
import "../css/userLogin.css";

function SignUpSuccess(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAuthDispatch();

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    let payload = { email, password };
    e.target.reset();

    try {
    //   loginUser(dispatch, payload);
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <>
      <div className="user-background-image" />
      <div
        style={{
          position: "absolute",
          width: "100%",
          margin: "0 auto",
          left: "35%",
          top: "40%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            verticalAlign: "middle",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            width: "400px",
          }}
        >
          <h3>Forgot Password?</h3>

          <form onSubmit={HandleFormSubmit}>
            <label htmlFor="username">
              <p>Email</p>
              <input
                type="text"
                placeholder="Enter email ..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {/* <div style={{ height: "15px" }}></div>
          <label htmlFor="email">
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter password ..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </label> */}
            <div style={{ height: "15px" }}></div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {errorMessage && (
                <span className="form-error">{errorMessage}</span>
              )}
              <button>Login</button>
            </div>
          </form>

          <a href="/practice">Back to Login</a>
        </div>
      </div>

      <div style={{ height: "40px" }} />
      <footer className="user-login-footer">
        <p style={{ paddingLeft: "20px" }}>Court Reporter Pro</p>
        <p style={{ paddingRight: "20px" }}>All Rights Reserved</p>
      </footer>
    </>
  );
}

export default SignUpSuccess;
