import React from "react";
import Layout from "../components/Layout";

/**
 * @author Chris P
 * @component Account Settings Page
 **/
export default function AccountSettingsPage() {
  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p>Practice Session</p>

        <div className="practice-container">
          <div className="practice-block"></div>
        </div>
        <div className="practice-side"></div>
      </div>
    </Layout>
  );
}
