/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { BsGlobe } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import en from "../util/images/gb.svg";
import es from "../util/images/es.svg";
import { useDetectOutsideClick } from "../util/detectOutsideClick";
import { logoutUser, useAuthDispatch } from "../context";
import typewriter from "../util/images/keyboard.png";
import "../css/header.css";

function Header() {
  // State variables for language dropdown menu
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const dispatch = useAuthDispatch();
  let history = useHistory();

  let darkTheme = JSON.parse(localStorage.getItem("currentUser")).darkTheme;

  function logout() {
    logoutUser(dispatch);
    history.push("/practice");
  }

  return (
    <div className={darkTheme ? "header-top-dark" : "header-top"}>
      <a href="/practice" className="header-logo">
        <img src={typewriter} alt=""></img>&nbsp;&nbsp;&nbsp;&nbsp;
        <h1>Court Reporter Pro</h1>
      </a>

      {/* BsGlobe */}
      {/* AiFillCaretDown */}

      <div className="header-right">
        {/* <div className="language-controls" ref={dropdownRef}>
          <button className="language-icons" onClick={onClick}>
            <BsGlobe size="26px" /> &nbsp;
            <AiFillCaretDown size="26px" />
          </button>
          <div
            className={`language-dropdown ${isActive ? "active" : "inactive"}`}
          >
            <a href="/#">
              <div>
                <img width="30px" alt="" src={en} />
                &nbsp;English
              </div>
            </a>
            <a href="/#">
              <div>
                <img width="30px" alt="" src={es} />
                &nbsp;Español
              </div>
            </a>
          </div>
        </div> */}
        <p className="header-right-spacing" />
        <a href="/account">
          <p>Account Settings</p>
        </a>
        <p className="header-right-spacing" />
        <a onClick={logout}>
          <p>Sign Out</p>
        </a>
      </div>
    </div>
  );
}

export default Header;
