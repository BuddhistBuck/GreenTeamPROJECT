/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import "../../css/login.css";
import { loginUser, useAuthState, useAuthDispatch } from "../../context";
import { useHistory } from "react-router-dom";

export default function AdminLogin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  let history = useHistory();

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const HandleFormSubmit = (e) => {
    e.preventDefault();
    let payload = { username, password };

    try {
      let response = loginUser(dispatch, payload);
      if (!response) {
        return;
      } else {
        history.push("/admin/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminHeader sidebar/>

      <div className="login">
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

          {/* {errorMessage && <span className="form-error">{errorMessage}</span>} */}
          <br />
          <button disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
