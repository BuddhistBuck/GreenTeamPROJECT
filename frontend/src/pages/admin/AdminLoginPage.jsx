import React, { useState, useEffect } from "react";
import AdminHeader from "../../components/AdminHeader";
import "../../css/adminLogin.css";
import { loginAdmin, useAuthDispatch } from "../../context";

/**
 * @component The component for the admin-side login page
 */
export default function AdminLoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAuthDispatch();
  document.body.style.backgroundColor = "white";

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    let payload = { username, password };
    loginAdmin(dispatch, payload);
    setLoading(true);
    setInterval(() => {
      setErrorMessage("Invalid username or password.");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <AdminHeader sidebar />
      <div className="admin-login">
        <div style={{ height: "40px" }} />
        <form onSubmit={HandleFormSubmit}>
          <label htmlFor="username">
            <p>Username</p>
            <input
              type="text"
              placeholder="Enter username ..."
              onChange={(e) => setUsername(e.target.value)}
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
            <div style={{ height: "15px" }}></div>
            {loading ? (
              <button style={{ backgroundColor: "#5AB4B4" }}>
                Logging in ...
              </button>
            ) : (
              <button>Login</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
