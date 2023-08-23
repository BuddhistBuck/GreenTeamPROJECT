/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import SignUpSuccess from "./SignUpSuccessPage";
import "../css/userSignup.css";
import { createAccountUser, useAuthDispatch } from "../context";
import logo from "../util/images/logo.gif";
import { formatPhoneNumber } from "../util/formatPhoneNumber";
import { validateEmail } from "../util/validateEmail";

/**
 * @component The component that is rendered when a user successfully creates an account
 */
export default function SignUpPage(props) {
  document.body.style.overflow = "hidden";
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputOccupation, setInputOccupation] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitSuccess, setSubmitSucccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAuthDispatch();

  useEffect(() => {
    setTimeout(() => setErrorMessage(""), 8000);
  }, []);

  const HandleFormSubmit = async (e) => {
    e.preventDefault();

    if (!inputFirstName || !inputLastName || !inputEmail || !password) {
      setErrorMessage("One or more required fields is empty");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Must have at least 8 characters in password");
      return;
    }

    if (validateEmail(inputEmail)) {
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
          phoneNumber: inputPhone.length === 14 ? inputPhone : "Not listed",
          password: password,
        };

        createAccountUser(dispatch, payload);
        setSubmitSucccess(true);
      } catch (error) {
        setErrorMessage("ERROR: ", error);
      }
    } else {
      setErrorMessage("Email is not in the proper format");
      return;
    }
  };

  return (
    <>
      {submitSuccess ? (
        <SignUpSuccess />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <div className="user-background-image" />
          <div className="user-signup">
            <div style={{ height: "30px" }} />
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
                    <p>
                      First Name<span style={{ color: "red" }}>&nbsp;*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Enter first name ..."
                      onChange={(e) => setInputFirstName(e.target.value)}
                    />
                  </label>
                  <label htmlFor="lastName">
                    <p>
                      Last Name<span style={{ color: "red" }}>&nbsp;*</span>
                    </p>
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
                    <p>
                      Email<span style={{ color: "red" }}>&nbsp;*</span>
                    </p>
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
                    <p>
                      Password<span style={{ color: "red" }}>&nbsp;*</span>
                    </p>
                    <input
                      type="password"
                      placeholder="Enter password ..."
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() =>
                        (document.getElementById(
                          "password-requirements"
                        ).style.display = "block")
                      }
                      onBlur={() =>
                        (document.getElementById(
                          "password-requirements"
                        ).style.display = "none")
                      }
                    />
                    {/* PASSWORD MESSAGE */}
                    <div id="password-requirements">
                      <span style={{ color: "#008B9E" }}>
                        Password must have a minimum of 8 characters.
                      </span>
                    </div>
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
                <span className="user-form-error">{errorMessage}</span>
                <div style={{ height: "15px" }} />
                <button>Sign Up</button>
                <div style={{ height: "15px" }} />
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
        </div>
      )}
    </>
  );
}
