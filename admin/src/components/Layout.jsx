import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";

function Layout(props) {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <div className="layout-container">
          <div className="layout-sidebar">
            <ul>
              <li>
                <NavLink to={`/`}>Home</NavLink>
              </li>
              <li>
                <NavLink to={`/users`}>Users</NavLink>
              </li>
              <li>
                <NavLink to={`/items`}>List Items</NavLink>
              </li>
              <li>
                <NavLink to={`/support`}>Support</NavLink>
              </li>
            </ul>
          </div>
          <div className="layout-content">{props.children}</div>
        </div>
      ) : (
        props.children
      )}
    </>
  );
}

export default Layout;
