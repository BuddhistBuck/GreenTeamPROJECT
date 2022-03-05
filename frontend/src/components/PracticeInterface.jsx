/* eslint-disable no-unused-vars */
/* eslint-disable no-control-regex */
import React, { useCallback, useEffect, useState } from "react";
import Timer from "./Timer";
import { s } from "../util/buildList";
import "../css/practice.css";

export default function PracticeInterface() {
  // Practice interface utilities
  const [startCounting, setStartCounting] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  // Count words utilities
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);

  // Detect current line utitlities
  const [correctMatch, setCorrectMatch] = useState("");
  const [incorrectMatch, setIncorrectMatch] = useState("");
  const [renderIncorrect, setRenderIncorrect] = useState("");
  const [tailText, setTailText] = useState(s[currentLineIndex]);
  const [capsLockMessage, setCapsLockMessage] = useState(false);
  const [nextLine, setNextLine] = useState("");


  // Detect if caps lock is on
  document.addEventListener("keydown", function (event) {
    var caps = event.getModifierState && event.getModifierState("CapsLock");
    setCapsLockMessage(caps);
  });

  // TODO: fix backspace issue with addEventListener
  function processInput(e) {
    // Starts timer
    if (!startCounting) {
      setStartCounting(true);
    }

    // Check if list is finished
    if (currentLineIndex + 1 === s.length) {
      // document.getElementById("clearInput").value = "List completed.";
      // setRemaining("Done");
    }

    // Highlight each letter with correct input
    let value = e.target.value;
    let txt = s[currentLineIndex].join("");
    let regex = new RegExp("^" + value, "g");
    // let inverse = new RegExp("!?" + value, "g");
    let idx = txt.match(regex);

    // Highlight next line
    if (value === txt) {
      Promise.resolve().then(() => {
        setCurrentLineIndex(currentLineIndex + 1);
        setTailText(s[currentLineIndex + 1]);
        setIncorrectMatch("");
        setRenderIncorrect("");
        setCorrectMatch("");
      });
      document.getElementById("main").value = "";
    }

    if (value)
      setTailText(
        txt.substring(
          correctMatch.length + incorrectMatch.length + 1,
          txt.length - 1
        )
      );

    // Set correct words
    if (idx) {
      setIncorrectMatch("");
      setRenderIncorrect("");

      let newText = [
        <strong key={idx.length}>{idx[0]}</strong>,
        txt.substring(idx.length - 1 + value.length),
      ];
      setCorrectMatch(newText[0].props.children);
      setTailText(newText[1]);
    } else {
      setIncorrectMatch(value.replace(correctMatch, ""));

      setRenderIncorrect(
        txt.substring(
          correctMatch.length,
          correctMatch.length + incorrectMatch.length + 1
        )
      );
    }
  }

  function refocusInput() {
    let inputBox = document.getElementById("main");
    setTimeout(function () {
      inputBox.focus();
    }, 100);
  }

  function CapsLockPrompt() {
    return (
      <p
        style={{
          color: "red",
          position: "absolute",
          marginLeft: "100px",
          marginTop: "-2px",
        }}
      >
        Caps lock is on.
      </p>
    );
  }

  return (
    <div className="practice-container">
      <Timer
        startCounting={startCounting}
        correctWords={correctWordArray.filter(Boolean).length}
      />
      <div style={{ textAlign: "center" }}>
        {!capsLockMessage ? <></> : <CapsLockPrompt />}
        {s.map((line, index) => {
          return (
            <div key={index}>
              {line === s[currentLineIndex] ? (
                <div style={{ backgroundColor: "#eeeef0" }}>
                  <div className="practice-input">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <br />

                      <input
                        id="main"
                        width="800px"
                        onBlur={refocusInput}
                        autoFocus
                        onChange={(e) => processInput(e)}
                      />
                    </form>
                  </div>
                  <span>
                    <strong style={{ textDecoration: "underline" }}>
                      {correctMatch}
                    </strong>
                    <strong style={{ color: "red" }}>{renderIncorrect}</strong>
                    <span>{tailText}</span>
                  </span>
                </div>
              ) : (
                <p>{line}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
