import React from "react";
import Header from "./Header";

/**
 * @component The component for the admin-side layout,
 * support for stick-header feature
 */
const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
