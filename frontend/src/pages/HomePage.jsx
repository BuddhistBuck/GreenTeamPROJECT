/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-func-assign */
import React, { useState, useRef } from "react";
import Layout from "../components/Layout";
import Word from "../components/Word";
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
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Detects state of letters
  const [correctLetterIndex, setCorrectLetterIndex] = useState(0);
  const [correctLetterArray, setCorrectLetterArray] = useState([]);

  // 'Select List' dropdown utilities
  const dropdownRef = useRef(null);
  const [isDropdownActive, setIsDropdownActive] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const onClick = () => setIsDropdownActive(!isDropdownActive);

  // 'Restart' button utilities
  function restartSession() {
    window.location.reload();
  }

  let cloud = s[currentLineIndex];

  function processInput(value) {
    // Starts timer
    if (!startCounting) {
      setStartCounting(true);
    }

    if (cloud && value) {
      console.log(value);
    }

    // Activates next word
    if (cloud && value.endsWith(" ")) {
      // Move currentLine to next line
      if (activeWordIndex === cloud.length - 1) {
        setCurrentLineIndex(currentLineIndex + 1);
        setCorrectWordArray([]);
        setActiveWordIndex(0);
        setUserInput("");
        return;
      }

      // Processes correct and incorrect words by indices
      setUserInput("");
      setActiveWordIndex(activeWordIndex + 1);
      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="practice-container">
          <h2>Practice Session</h2>
          <div className="practice-block">
            <div className="practice-top-buttons" ref={dropdownRef}>
              <a href="/#" onClick={restartSession}>
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
              {cloud ? (
                s.map(function (word, index) {
                  return (
                    <div key={index}>
                      {word === cloud ? (
                        <Word
                          key={index}
                          active={index === activeWordIndex}
                          correct={correctWordArray[index]}
                          currentLine={cloud}
                          currentWord={cloud[activeWordIndex]}
                        />
                      ) : (
                        <p key={index}>
                          {word.map((item, index) => {
                            return <span key={index}>{item}&nbsp;</span>;
                          })}
                        </p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>List completed</p>
              )}
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
                  value={userInput}
                  onChange={(e) => processInput(e.target.value)}
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
