import React from "react";
import Header from "./Header";
import "../css/layout.css";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
