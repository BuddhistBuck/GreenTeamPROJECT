import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import "../css/adminLayout.css";

const AdminLayout = ({ selectedLink, children }) => {

  // Changes the colors of the sidebars
  function renderSelectedLink(selected) {
    switch (selected) {
      case selected = "documentation":
        return (
          <ul>
            <a href="/admin/documentation">
              <li className="sidebar-active">Documentation </li>
            </a>
            <br />
            <a href="/admin/users">
              <li className="sidebar-inactive">Users </li>
            </a>
            <br />
            <a href="/admin/lists">
              <li className="sidebar-inactive">Lists </li>
            </a>
          </ul>
        );
      case selected = "users":
        return (
          <ul>
            <a href="/admin/documentation">
              <li className="sidebar-inactive">Documentation </li>
            </a>
            <br />
            <a href="/admin/users">
              <li className="sidebar-active">Users </li>
            </a>
            <br />
            <a href="/admin/lists">
              <li className="sidebar-inactive">Lists </li>
            </a>
          </ul>
        );
      case selected = "lists":
        return (
          <ul>
            <a href="/admin/documentation">
              <li className="sidebar-inactive">Documentation </li>
            </a>
            <br />
            <a href="/admin/users">
              <li className="sidebar-inactive">Users </li>
            </a>
            <br />
            <a href="/admin/lists">
              <li className="sidebar-active">Lists </li>
            </a>
          </ul>
        );
      default:
        return (
          <></>
          // <ul>
          //   <a href="/admin/documentation">
          //     <li className="sidebar-inactive">Documentation </li>
          //   </a>
          //   <br />
          //   <a href="/admin/users">
          //     <li className="sidebar-inactive">Users </li>
          //   </a>
          //   <br />
          //   <a href="/admin/lists">
          //     <li className="sidebar-inactive">Lists </li>
          //   </a>
          // </ul>
        );
    }
  }

  return (
    <>
      <AdminHeader />

      <div className="admin-container">
        <div className="admin-sidebar">{renderSelectedLink(selectedLink)}</div>
        <div className="admin-content">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
