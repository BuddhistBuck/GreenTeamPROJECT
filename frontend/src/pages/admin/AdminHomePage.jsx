import React from "react";
import AdminLayout from "../../components/AdminLayout";

/**
 * @component The component for the admin-side home page
 */
export default function AdminHomePage(props) {
  return (
    <AdminLayout sidebar selectedLink="documentation">
      <h2>Documentation</h2>
      <p>Last Updated: 05/23/2022</p>
    </AdminLayout>
  );
}
