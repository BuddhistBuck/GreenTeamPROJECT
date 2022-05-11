import React, { useState } from "react";
import NewPasswordEmailSent from "../components/NewPasswordEmailSent";
import logo from "../util/images/logo.gif";
import "../css/userLogin.css";

function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Create find user by email route
  };

  return (
    <>
      <div className="user-background-image" />
      <div style={{ height: "40px" }} />
      <div className="user-login">
        <div style={{ height: "40px" }} />

        {/* SOURCE: https://www.flaticon.com/free-icon/typewriter_387124?related_id=387124&origin=tag# */}
        <img src={logo} alt="" width="150em" />

        <h3>Court Reporter Pro</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {emailSent ? (
            <form onSubmit={handleSubmit}>
              <p style={{ textAlign: "center" }}>
                Enter your email address below and we'll send you a link to
                reset your password.
              </p>
              <label htmlFor="username">
                <p>Email</p>
                <input
                  type="text"
                  placeholder="Enter email ..."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div style={{ height: "15px" }}></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                {errorMessage && (
                  <span className="user-form-error">{errorMessage}</span>
                )}

                <button onClick={handleSubmit}>Reset Password</button>
              </div>
              <div style={{ height: "20px" }}></div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <span>
                  <a href="/practice">Login</a>&nbsp;or&nbsp;
                  <a href="/signup">Signup</a>
                </span>
              </div>
            </form>
          ) : (
            <NewPasswordEmailSent />
          )}
        </div>
        <div style={{ height: "60px" }} />
      </div>
      <div style={{ height: "40px" }} />

      <footer className="user-login-footer">
        <p style={{ paddingLeft: "20px" }}>Court Reporter Pro</p>
        <p style={{ paddingRight: "20px" }}>All Rights Reserved</p>
      </footer>
    </>
  );
}

export default ResetPassword;
