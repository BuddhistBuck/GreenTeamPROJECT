import React from "react";
import AdminLayout from "../../components/AdminLayout";

export default function AdminHomePage(props) {
  return (
    <AdminLayout sidebar selectedLink="documentation">
      <h2>Documentation</h2>
      <p>Last Updated: 03/28/2022</p>
    </AdminLayout>
  );
}
