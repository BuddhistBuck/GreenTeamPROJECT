/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-func-assign */

// Import packages and UI components
import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import PracticeInterface from "../components/PracticeInterface";
import "../css/practice.css";

// Practice page style components and utilities
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import { MetronomeClearIcon, MetronomeSolidIcon } from "../util/metronomeIcons";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import muiTheme from "../util/muiTheme";
import { useDetectOutsideClick } from "../util/detectOutsideClick";
import { marks } from "../util/sliderValues";

const lists = [
  { category: "Words", data: "stenoData" },
  { category: "Numbers", data: "numbers" },
  { category: "Phrases", data: "phrases" },
  { category: "States", data: "states" },
  { category: "Years", data: "years" },
];

const userLists = [
  { category: "Exam 1", data: ["Exam 1"] },
  { category: "Exam 2", data: ["Exam 2"] },
  { category: "Practice 1", data: ["Practice 1"] },
  { category: "Practice 2", data: ["Practice 2"] },
];

/**
 * @component Home Page and Practice Session
 **/
export default function PraticePage() {
  // 'Select List' dropdown utilities
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [listItems, setListItems] = useState("stenoData");
  const [metronomeIcon, setMetronomeIcon] = useState(true);
  const [selectedButton, setSelectedButton] = useState(false);
  const [wpm, setWpm] = useState(200);
  const [begin, setBegin] = useState(false);
  const [view, setView] = useState("Words");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const handleMetronomeClick = () => {
    setMetronomeIcon(!metronomeIcon);
  };

  const handleSelectButton = () => {
    setSelectedButton(!selectedButton);
  };

  function PracticeMenu() {
    return (
      <div className="practice-menu-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            border: "2px solid silver",
          }}
        >
          <div className="practice-menu-select-list">
            <h3>Select List</h3>
            <ThemeProvider theme={muiTheme}>
              <ToggleButtonGroup
                orientation="vertical"
                value={view}
                exclusive
                onChange={handleChange}
              >
                {lists.map((option, index) => {
                  return (
                    <ToggleButton
                      size="large"
                      variant="outlined"
                      key={index}
                      value={option.data}
                      onClick={() => {
                        setListItems(option.data);
                      }}
                      color={selectedButton ? "primary" : "secondary"}
                    >
                      {option.category}
                    </ToggleButton>
                  );
                })}
                <div style={{ height: "20px" }}></div>

                <Divider>Custom Lists</Divider>
                <div
                  style={{ height: "20px", borderBottom: "1px solid #d9d9d9" }}
                ></div>

                {userLists.map((option, index) => {
                  return (
                    <ToggleButton
                      size="large"
                      variant="outlined"
                      key={index}
                      value={option.data}
                      onClick={() => {
                        setListItems(option.category);
                      }}
                      color={selectedButton ? "primary" : "secondary"}
                    >
                      {option.category}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            </ThemeProvider>
            <div style={{ height: "20px" }}></div>
          </div>
        </div>
        <div style={{ width: "50px" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* WPM Slider Component */}
          <Box
            sx={{
              height: "200px",
              paddingRight: "30px",
            }}
          >
            <br />
            <ThemeProvider theme={muiTheme}>
              <Slider
                defaultValue={wpm}
                orientation="vertical"
                step={50}
                marks={marks}
                min={100}
                max={300}
                onChange={(e, val) => setWpm(val)}
                color="primary"
              />
            </ThemeProvider>
          </Box>
          <div style={{ height: "70px" }} />

          <ThemeProvider theme={muiTheme}>
            <Button
              style={{ height: "150px" }}
              variant="contained"
              value=""
              onClick={() => {
                setBegin(true);
              }}
            >
              Begin
            </Button>
          </ThemeProvider>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {begin && listItems ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="practice-root">
            <div className="practice-block">
              <h2>Practice</h2>
              <Divider />
              <br />
              <div className="practice-top-buttons" ref={dropdownRef}>
                <a
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Back to Menu
                </a>
                <a
                  onClick={() => {
                    setSelectedOption(selectedOption);
                  }}
                >
                  Restart Session
                </a>
              </div>
              <div style={{ height: "50px" }}></div>

              <div className="practice-wpm">
                <div style={{ width: "50px" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ThemeProvider theme={muiTheme}>
                    <ToggleButton
                      variant="outlined"
                      onClick={() => handleMetronomeClick(false)}
                      className="metronome-button"
                    >
                      {metronomeIcon ? (
                        <MetronomeClearIcon />
                      ) : (
                        <MetronomeSolidIcon />
                      )}
                    </ToggleButton>
                  </ThemeProvider>
                </div>
                <div style={{ width: "50px" }} />

                {/* ---- DELETE THIS ---- */}

                {/* <div>
                  {listItems.map((data) => {
                    return (
                      <>
                        <p>{data}</p>
                      </>
                    );
                  })}
                </div> */}

                {/* ---- DISPLAY LIST DATA ---- */}
                <PracticeInterface wpm={wpm} listItems={listItems} />
                <div style={{ width: "100px" }} />
              </div>
            </div>
          </div>
          <div style={{ height: "300px" }} />
        </div>
      ) : (
        <PracticeMenu />
      )}
    </Layout>
  );
}
