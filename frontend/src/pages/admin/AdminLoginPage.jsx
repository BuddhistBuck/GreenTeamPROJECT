import React, { useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import "../../css/adminLogin.css";
import { loginAdmin, useAuthDispatch } from "../../context";

export default function AdminLoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAuthDispatch();

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    let payload = { username, password };
    e.target.reset();

    try {
      loginAdmin(dispatch, payload);
    } catch (error) {
      setErrorMessage("Unable to sign in");
    }
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
              type="text"
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
            {errorMessage && <span className="form-error">{errorMessage}</span>}
            <button>Login</button>
          </div>
        </form>
      </div>
    </>
  );
}
