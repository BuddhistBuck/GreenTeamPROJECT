import React, { useEffect, useState } from "react";
import { stenoData } from "../util/stenoData/stenoData";
import { numbers } from "../util/stenoData/numbers";
import { phrases } from "../util/stenoData/phrases";
import { states } from "../util/stenoData/states";
import { years } from "../util/stenoData/years";

/**
 * @author Andrew
 * @function PracticeInterface
 **/
export default function PracticeInterface(props) {
  const { wpm, listItems } = props;
  const [listData, setListData] = useState([]);

  useEffect(() => {
    switch (listItems) {
      case "stenoData":
        setListData(stenoData);
        break;
      case "numbers":
        setListData(numbers);
        break;
      case "phrases":
        setListData(phrases);
        break;
      case "states":
        setListData(states);
        break;
      case "years":
        setListData(years);
        break;
      default:
        setListData([]);
        break;
    }
  }, [listItems]);

  async function testDisplaySpeed(finalArray, WPM) {
    let WPS = (60 / WPM) * 1000;
    let sleep = (millisecond) =>
      new Promise((whatIsDelay) => setTimeout(whatIsDelay, millisecond));
    for (let i = 0, len = finalArray.length; i < len; i++) {
      let numberOfWords = finalArray[i].split(" ").length;
      let combinedWPS = WPS * numberOfWords;
      document.getElementById("words").innerHTML = finalArray[i];
      await sleep(combinedWPS);
    }
  }

  function stenoWordsSelected(data, speed) {
    testDisplaySpeed(data, speed);
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
        <h1 id="words">{stenoWordsSelected(listData, wpm)}</h1>
      </div>
    </div>
  );
}
