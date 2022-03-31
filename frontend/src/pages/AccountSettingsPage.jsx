import React from "react";
import Layout from "../components/Layout";
import Divider from "@mui/material/Divider";
import "../css/account.css";
import stripeBadge from "../util/images/stripe-badge-grey.png";

/**
 * @author Chris P
 * @component Account Settings Page
 **/
export default function AccountSettingsPage() {
  return (
    <Layout>
      <div className="account-container">
        <h2>Account Settings</h2>
        <Divider />
        <div className="account-content">
          <div className="account-block">
            <div className="account-option">
              <p>Subscription Status: </p>&nbsp;
              <p style={{ color: "#007ea7" }}>Active</p>
            </div>
            <div className="account-option">
              <p>Payment Method: </p>&nbsp;
              <p style={{ color: "#007ea7" }}>Active</p>
            </div>
            <div className="account-option">
              <p>Custom List Count: </p>&nbsp;
              <p style={{ color: "#007ea7" }}>1099</p>
            </div>
          </div>
        </div>
        <div style={{ height: "50px" }} />
        <img src={stripeBadge} alt="" width="400px" />
      </div>
    </Layout>
  );
}
