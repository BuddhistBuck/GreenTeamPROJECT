import React from "react";
import AdminHeader from "./AdminHeader";
import { NavLink } from "react-router-dom";
import "../css/adminLayout.css";

const AdminLayout = (props) => {
  return (
    <>
      <AdminHeader />

      <div className="admin-container">
        <div className="admin-sidebar">
          <ul>
            <li>
              <a href="/admin-home">Documentation</a>
            </li>
            <br />
            <li>
              <a href="/manage-users">Users</a>
            </li>
            <br />
            <li>
              <a href="/manage-lists">Lists</a>
            </li>
          </ul>
        </div>
        <div className="admin-content">{props.children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
