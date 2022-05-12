/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import SignUpSuccess from "./SignUpSuccess";
import "../css/userSignup.css";
import { createAccountUser, useAuthDispatch } from "../context";
import logo from "../util/images/logo.gif";
import { formatPhoneNumber } from "../util/formatPhoneNumber";

export default function SignUpPage(props) {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputOccupation, setInputOccupation] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitSuccess, setSubmitSucccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAuthDispatch();

  const HandleFormSubmit = async (e) => {
    e.preventDefault();

    let firstName =
      inputFirstName.charAt(0).toUpperCase() + inputFirstName.slice(1);
    let lastName =
      inputLastName.charAt(0).toUpperCase() + inputLastName.slice(1);
    let occupation =
      inputOccupation.charAt(0).toUpperCase() + inputOccupation.slice(1);

    try {
      let payload = {
        firstName: firstName,
        lastName: lastName,
        occupation: occupation,
        email: inputEmail,
        phoneNumber: inputPhone,
        password: password,
      };

      createAccountUser(dispatch, payload);
      setSubmitSucccess(true);
    } catch (error) {
      setErrorMessage("ERROR: ", error);
    }
  };

  return (
    <>
      {submitSuccess ? (
        <SignUpSuccess />
      ) : (
        <>
          <div className="user-background-image" />
          <div style={{ height: "20px" }} />
          <div className="user-signup">
            <div style={{ height: "40px" }} />
            <img src={logo} alt="" width="150em" />
            <h4>Create a New Account</h4>
            <form onSubmit={HandleFormSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="firstName">
                    <p>First Name</p>
                    <input
                      type="text"
                      placeholder="Enter first name ..."
                      onChange={(e) => setInputFirstName(e.target.value)}
                    />
                  </label>
                  <label htmlFor="lastName">
                    <p>Last Name</p>
                    <input
                      type="text"
                      placeholder="Enter last name ..."
                      onChange={(e) => setInputLastName(e.target.value)}
                    />
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="email">
                    <p>Email</p>
                    <input
                      type="text"
                      placeholder="Enter email ..."
                      onChange={(e) => setInputEmail(e.target.value)}
                    />
                  </label>
                  <label htmlFor="occupation">
                    <p>Occupation</p>
                    <input
                      type="text"
                      placeholder="Enter occupation ..."
                      onChange={(e) => setInputOccupation(e.target.value)}
                    />
                  </label>
                </div>
                <div style={{ width: "20px" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="phone">
                    <p>Phone Number</p>
                    <input
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={inputPhone}
                      onChange={(e) => {
                        const formattedPhoneNumber = formatPhoneNumber(
                          e.target.value
                        );
                        setInputPhone(formattedPhoneNumber);
                      }}
                    />
                  </label>
                  <label htmlFor="password">
                    <p>Password</p>
                    <input
                      type="password"
                      placeholder="Enter password ..."
                      onChange={(e) => setPassword(e.target.value)}
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
                <button>Sign Up</button>
                <div style={{height: '15px'}}/>
                <a href="/practice" style={{ margin: "0 auto" }}>
                  Already have an account? Login here.
                </a>
              </div>
            </form>
            <div style={{ height: "40px" }} />
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
