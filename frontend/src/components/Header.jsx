import React, { useState, useRef, useEffect } from "react";
import { BsGlobe } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import en from "../util/images/gb.svg";
import es from "../util/images/es.svg";
import { useDetectOutsideClick } from "../util/detectOutsideClick";
import "../css/header.css";

function Header() {
  // State variables for language dropdown menu
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);


  return (
    <div className="header-top">
      <>
        <h1>Court Reporter Pro</h1>
      </>

      {/* BsGlobe */}
      {/* AiFillCaretDown */}

      <div className="header-right">
        <div className="language-controls" ref={dropdownRef}>
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
        </div>
        <p style={{ width: "20px" }} />
        <a href="/#">
          <p>Account</p>
        </a>
        <p style={{ width: "20px" }} />
        <a href="/#">
          <p>Sign Out</p>
        </a>
      </div>
    </div>
  );
}

export default Header;
