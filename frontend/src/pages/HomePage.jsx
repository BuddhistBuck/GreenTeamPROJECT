/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-func-assign */
import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import Timer from "../components/Timer";
import { useDetectOutsideClick } from "../util/detectOutsideClick";
import loadTerms from "../util/loadTerms";
import { s } from "../util/buildList";
import "../css/practice.css";

/**
 * @author Chris P
 * @component Home Page and Practice Session
 **/
export default function HomePage() {
  // Practice interface utilities
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  // Detect current line utitlities
  let cloud = s[currentLineIndex];
  const [correctMatch, setCorrectMatch] = useState("");
  const [remaining, setRemaining] = useState(cloud);

  // 'Select List' dropdown utilities
  const dropdownRef = useRef(null);
  const [isDropdownActive, setIsDropdownActive] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const onClick = () => setIsDropdownActive(!isDropdownActive);

  function processInput(e) {
    console.log(`currentLineIndex: ${currentLineIndex} || s.length: ${s.length}`)
    // Check if list is finished
    // if (currentLineIndex + 1 === s.length) {
    //   document.getElementById("clearInput").value = "List completed.";
    //   setRemaining("Done");
    // }

    // Starts timer
    if (!startCounting) {
      setStartCounting(true);
    }

    // Highlight text
    let value = e.target.value;
    let txt = cloud.join("");
    let regex = new RegExp("^" + value, "g");
    let idx = txt.match(regex);

    if (value === txt) {
      setCurrentLineIndex(currentLineIndex + 1);
      setRemaining(s[currentLineIndex]);
      document.getElementById("clearInput").value = "";
    }

    if (idx) {
      let newText = [
        <strong key={idx.length}>{idx[0]}</strong>,
        txt.substring(idx.length - 1 + value.length),
      ];
      setCorrectMatch(newText[0].props.children);
      setRemaining(newText[1]);
    }
  }

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="practice-container">
          <h2>Practice Session</h2>
          <div className="practice-block">
            <div className="practice-top-buttons" ref={dropdownRef}>
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
            <Timer
              startCounting={startCounting}
              correctWords={correctWordArray.filter(Boolean).length}
            />

            <div className="practice-item-queue">
              {s.map((line, index) => {
                return (
                  <div key={index}>
                    {line === cloud ? (
                      <div style={{ backgroundColor: "#eeeef0" }}>
                        {remaining ? (
                          <span>
                            <strong style={{ textDecoration: "underline" }}>
                              {correctMatch}
                            </strong>
                            <span>{remaining}</span>
                          </span>
                        ) : (
                          <span>{s[currentLineIndex]}</span>
                        )}
                      </div>
                    ) : (
                      <p>{line}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="practice-interface">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <br />
                <input
                  size="30px"
                  height="20px"
                  placeholder="Start typing ... "
                  id="clearInput"
                  onChange={(e) => processInput(e)}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="practice-side">{/* place WPM widget here */}</div>
      </div>
    </Layout>
  );
}
