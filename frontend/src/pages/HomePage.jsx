/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-func-assign */
import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import WpmSlider from "../components/WpmSlider";
import PracticeInterface from "../components/PracticeInterface";
import "../css/practice.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { MetronomeClearIcon, MetronomeSolidIcon } from "../util/metronomeIcons";

import { useDetectOutsideClick } from "../util/detectOutsideClick";
import loadTerms from "../util/loadTerms";

const theme = createTheme({
  palette: {
    primary: { main: "#419999" },
  },
});

/**
 * @author Chris P
 * @component Home Page and Practice Session
 **/
export default function HomePage() {
  // 'Select List' dropdown utilities
  const dropdownRef = useRef(null);
  const [isDropdownActive, setIsDropdownActive] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const onClick = () => setIsDropdownActive(!isDropdownActive);

  // Metronome icon utilities
  const [metronomeIcon, setMetronomeIcon] = useState(true);

  const handleMetronomeClick = () => {
    setMetronomeIcon(!metronomeIcon);
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="practice-root">
          <div className="practice-block">
            <h2>Practice</h2>
            <Divider />
            <br />
            <div className="practice-top-buttons" ref={dropdownRef}>
              <a href="#" onClick={() => {}}>
                Back to Menu
              </a>
              <a href="/#" onClick={() => window.location.reload()}>
                Restart Session
              </a>
              <a href="#" onClick={onClick}>
                Select List
              </a>
              <div
                className={`select-list-dropdown ${
                  isDropdownActive ? "active" : "inactive"
                }`}
              >
                <a href="#" onClick={() => loadTerms("court")}>
                  Court Terms
                </a>
                <a href="#" onClick={() => loadTerms("medical")}>
                  Medical Terms
                </a>
              </div>
            </div>
            <div style={{ height: "50px" }}></div>

            <div className="practice-wpm">
              <ThemeProvider theme={theme}>
                <Button
                  variant="outlined"
                  onClick={() => handleMetronomeClick(false)}
                  className="metronome-button"
                >
                  {metronomeIcon ? (
                    <MetronomeClearIcon />
                  ) : (
                    <MetronomeSolidIcon />
                  )}
                </Button>
              </ThemeProvider>
              <div style={{ width: "50px" }} />
              <WpmSlider />
              <div style={{ width: "50px" }} />
              <PracticeInterface />
              <div style={{ width: "50px" }} />

            </div>
          </div>
        </div>
        <div className="practice-side">{/* place WPM widget here */}</div>
        <div style={{ height: "200px" }} />
      </div>
    </Layout>
  );
}
