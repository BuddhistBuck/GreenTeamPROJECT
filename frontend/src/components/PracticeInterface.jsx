import React, { useEffect, useState } from "react";

/**
 * @author Andrew
 * @function PracticeInterface
 **/
export default function PracticeInterface(props) {
  const { wpm, listItems } = props;
  const [sessionComplete, setSessionComplete] = useState(false);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid #003459",
        padding: "20px",
        width: "100%",
      }}
    >
      <h3>WPM: {wpm}</h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#e6e6e6",
        }}
      >
        {!sessionComplete ? (
          <h1 id="words">No words in this list</h1>
        ) : (
          <h1 style={{ color: "green" }}>Session Complete</h1>
        )}
      </div>
    </div>
  );
}
