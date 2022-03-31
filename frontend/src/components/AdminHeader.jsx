import React from "react";
import "../css/adminHeader.css";

function Header() {
  return (
    <div className="admin-header">
      <a href="/admin">
        <h2>
          Court Reporter Pro <span> | Admin Dashboard</span>
        </h2>
      </a>
      <a href="/">
        <h2>
          <span style={{ fontSize: "16px" }}>Back To Home</span>
        </h2>
      </a>
    </div>
  );
}

export default Header;
