/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import SignUpSucccess from "./SignUpSucccess";
import "../css/userSignup.css";
import { loginUser, useAuthDispatch } from "../context";
import logo from "../util/images/logo.gif";

export default function SignUpPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitSuccess, setSubmitSucccess] = useState(false);
  const [passwordMismatchMessage, setPasswordMismatchMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAuthDispatch();

  const HandleFormSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      let payload = { firstName, lastName, email, password };

      try {
        // signUpUser(dispatch, payload);
      } catch (error) {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    } else {
      setPasswordMismatchMessage(
        "Password fields don't match, please try again."
      );
    }
  };

  return (
    <>
      {submitSuccess ? (
        <SignUpSucccess />
      ) : (
        <>
          <div className="user-background-image" />
          <div style={{ height: "20px" }} />

          <div className="user-signup">
            <a
              href="/practice"
              style={{
                position: "absolute",
                marginLeft: "-50%",
                marginTop: "20px",
              }}
            >
              Back to Login
            </a>

            <div style={{ height: "40px" }} />
            {/* SOURCE: https://www.flaticon.com/free-icon/typewriter_387124?related_id=387124&origin=tag# */}
            <img src={logo} alt="" width="150em" />
            <h4>Create a New Account</h4>

            <form onSubmit={HandleFormSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <label htmlFor="username">
                    <p>First Name</p>
                    <input
                      type="text"
                      placeholder="Enter first name ..."
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label htmlFor="email">
                    <p>Password</p>
                    <input
                      type="password"
                      placeholder="Enter password ..."
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <label htmlFor="email">
                    <p>Email</p>
                    <input
                      type="text"
                      placeholder="Enter email ..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <div style={{ width: "20px" }} />
                <div>
                  <label htmlFor="lastname">
                    <p>Last Name</p>
                    <input
                      type="text"
                      placeholder="Enter last name ..."
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>

                  <label htmlFor="email">
                    <p>Confirm Password</p>
                    <input
                      type="password"
                      placeholder="Enter password ..."
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div style={{ height: "15px" }}></div>

              <div style={{ height: "15px" }}></div>
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
                {passwordMismatchMessage && (
                  <span className="form-error">{errorMessage}</span>
                )}
                <button>Sign Up</button>
              </div>
            </form>
            <div style={{ height: "20px" }} />
          </div>
          <footer className="user-signup-footer">
            <p style={{ paddingLeft: "20px" }}>Court Reporter Pro</p>
            <p style={{ paddingRight: "20px" }}>All Rights Reserved</p>
          </footer>
        </>
      )}
    </>
  );
}
