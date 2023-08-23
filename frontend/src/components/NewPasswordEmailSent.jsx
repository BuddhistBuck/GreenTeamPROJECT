import React from "react";

/**
 * @component (CURRENTLY NOT USED) The component that renders the
 * screen confirming that a password request email is sent
 */
function NewPasswordEmailSent(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          verticalAlign: "middle",
          backgroundColor: "#FFFAF6",
          border: "1px solid #FCCC9D",
          padding: "20px",
          borderRadius: "5px",
          width: "400px",
        }}
      >
        <h3>
          Check your inbox for the next steps. If you don't receive an email,
          and it's not in your spam folder this could mean you signed up with a
          different address.
        </h3>
        <a href="/practice">Back to Login</a>
      </div>
    </div>
  );
}

export default NewPasswordEmailSent;
