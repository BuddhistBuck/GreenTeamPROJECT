import React from "react";
import "../css/userLogin.css";

function SignUpSuccess(props) {
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
          {/* <h3>
            Account has been created. Please check your email and confirm your
            account.
          </h3> */}
          <h3>
            Account has been created. You can now log in to Court Reporter Pro
            with your credentials.
          </h3>
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
