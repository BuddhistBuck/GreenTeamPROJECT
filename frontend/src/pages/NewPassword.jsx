import React, { useState } from "react";
import "../css/userLogin.css";

function NewPasswordSet() {
  return (
    <>
      <h3>Password change successful</h3>
      <p>
        Your password has been reset. Click below to navigate to the login page.
      </p>
      <div>
        <span>
          <a href="/practice">Login</a>
        </span>
      </div>
    </>
  );
}

function NewPassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSet, setPasswordSet] = useState();

  function handleSubmit() {}

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
          {passwordSet ? (
            <NewPasswordSet />
          ) : (
            <div>
              <h3>Enter a new password</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                  <p>Password</p>
                  <input
                    type="password"
                    placeholder="Enter password ..."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <div style={{ height: "15px" }}></div>
                <label htmlFor="email">
                  <p>Password</p>
                  <input
                    type="password"
                    placeholder="Enter password ..."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button type="submit" />
                </label>
                <div style={{ height: "15px" }}></div>
              </form>
              <div>
                <span>
                  <a href="/practice">Login</a>&nbsp;or&nbsp;
                  <a href="/signup">Signup</a>
                </span>
              </div>
            </div>
          )}
        </div>

        <div style={{ height: "40px" }} />
        <footer className="user-login-footer">
          <p style={{ paddingLeft: "20px" }}>Court Reporter Pro</p>
          <p style={{ paddingRight: "20px" }}>All Rights Reserved</p>
        </footer>
      </div>
    </>
  );
}

export default NewPassword;
