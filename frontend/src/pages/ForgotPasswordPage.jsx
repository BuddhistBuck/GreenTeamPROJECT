import React, { useEffect, useState } from "react";
import { loginUser, useAuthDispatch } from "../context";
import logo from "../util/images/logo.gif";
import "../css/forgotPassword.css";
import Axios from "axios";
import { baseUrl } from "../util/baseUrl";
import NewPasswordEmailSent from "../components/NewPasswordEmailSent";

function SignUpSuccess(props) {
  const [email, setEmail] = useState("");
  const [emailFound, setEmailFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmails, setUserEmails] = useState("");

  useEffect(() => {
    Axios.get(`${baseUrl}/users`).then((res) => {
      let items = [];
      for (let i = 0; i < Object.entries(res.data).length; i++) {
        items.push(Object.entries(res.data)[i][1].email);
      }
      setUserEmails(items);
    });

    setTimeout(() => {
      setErrorMessage("");
    }, 8000);
  }, []);

  function searchEmail(emails, email) {
    for (let i = 0; i < emails.length; i++) {
      if (email === emails[i]) {
        console.log("Email found");
        setEmailFound(true);
      } else {
        setErrorMessage("Email was not found. Please try again.");
      }
    }
  }

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    // e.target.reset();

    searchEmail(userEmails, email);
  };

  return (
    <>
      <div className="user-background-image" />
      {emailFound ? (
        <NewPasswordEmailSent />
      ) : (
        <div className="forgot-password-root">
          <div className="forgot-password-container">
            <h3>Forgot Password?</h3>
            <div className="forgot-password-form">
              <form onSubmit={HandleFormSubmit}>
                <p>
                  Enter your email address below and we'll send you a link to
                  reset your password.
                </p>
                <label>
                  <p>Email Address</p>
                  <input
                    type="email"
                    placeholder="Enter email ..."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <div style={{ height: "10px" }}></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {errorMessage && (
                    <span style={{ color: "red" }}>{errorMessage}</span>
                  )}
                  <div style={{ height: "10px" }}></div>
                  <button>Reset Password</button>
                </div>
              </form>
            </div>
            <div style={{ height: "20px" }} />
            <a href="/practice">Back to Login</a>
            <div style={{ height: "10px" }}></div>
          </div>
        </div>
      )}
      <div style={{ height: "40px" }} />
      <footer className="user-login-footer">
        <p style={{ paddingLeft: "20px" }}>Court Reporter Pro</p>
        <p style={{ paddingRight: "20px" }}>All Rights Reserved</p>
      </footer>
    </>
  );
}

export default SignUpSuccess;
