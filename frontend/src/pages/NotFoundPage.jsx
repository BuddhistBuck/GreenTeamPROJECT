import React from "react";
import errorImg from "../util/images/404.png";

/**
 * @component The component that is renered upon visiting a non-existant link
 */
export default function NotFoundPage(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <br />
      <h1 style={{ fontSize: "60px" }}>404</h1>
      <h3 style={{ margin: "-15px", paddingBottom: "30px" }}>Not Found</h3>
      <img style={{ padding: "20px", width: "100px" }} src={errorImg} alt="" />
      <p>
        Sorry, we couldn't find this page. But don't worry, you can redirect
        back to our homepage&nbsp;
        <a style={{ color: "#419999" }} href="/practice">
          here
        </a>
        .
      </p>
    </div>
  );
}
