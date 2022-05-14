import React, { useEffect, useState } from "react";
import "../css/practice.css";

/**
 * @author Andrew
 * @function PracticeInterface
 **/
export default function PracticeInterface(props) {
  const { wpm, listItems } = props;
  console.log(listItems);
  const [sessionComplete, setSessionComplete] = useState(false);
  let darkTheme = JSON.parse(localStorage.getItem("currentUser")).darkTheme;

  useEffect(() => {
    if (listItems.length > 0) {
      testDisplaySpeed(listItems, wpm);
    }
  }, [listItems, wpm]);

  async function testDisplaySpeed(finalArray, WPM) {
    let WPS = (60 / WPM) * 1000;
    let sleep = (millisecond) =>
      new Promise((whatIsDelay) => setTimeout(whatIsDelay, millisecond));
    for (let i = 0; i < finalArray.length; i++) {
      document.getElementById("words").innerHTML = finalArray[i];
      await sleep(WPS * finalArray[i].length);
    }

    setSessionComplete(true);
  }

  return (
    <div className={darkTheme ? "practice-word-box-dark" : "practice-word-box"}>
      <h3 style={darkTheme ? { color: "white" } : { color: "black" }}>
        WPM: {wpm}
      </h3>

      <div
        style={
          darkTheme
            ? {
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#666666",
              }
            : {
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#efefef",
              }
        }
      >
        {!sessionComplete ? (
          <h1
            id="words"
            style={darkTheme ? { color: "white" } : { color: "black" }}
          >
            No words in this list
          </h1>
        ) : (
          <h1 style={darkTheme ? { color: "#00a8e8" } : { color: "#008B9E" }}>
            Session Complete
          </h1>
        )}
      </div>
    </div>
  );
}
