import React, { useEffect } from "react";
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
  const { WPM } = props;

  useEffect(() => {
    // console.log("component updated");
  });

  let finalArray = [];

  function convertToArray(string) {
    let tempString = "";
    for (let i = 0, len = string.length; i < len; i++) {
      if (string[i] === "\n") {
        finalArray.push(tempString);
        tempString = "";
      } else {
        tempString += string[i];
      }
    }
    return finalArray;
  }

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

  function stenoWordsSelected() {
    convertToArray(stenoData);
    testDisplaySpeed(finalArray, WPM);
  }

  function stenoPhraseSelected() {
    convertToArray(phrases);
    testDisplaySpeed(finalArray, WPM);
  }

  function stenoNumbersSelected() {
    convertToArray(numbers);
    testDisplaySpeed(finalArray, WPM);
  }

  function stenoStatesSelected() {
    convertToArray(states);
    testDisplaySpeed(finalArray, WPM);
  }

  function stenoYearsSelected() {
    convertToArray(years);
    testDisplaySpeed(finalArray, WPM);
  }

  function WPMchanged() {
    WPM = document.getElementById("speedNumber").value;
    if (WPM < 60) {
      WPM = 60;
    } else if (WPM > 300) {
      WPM = 300;
    } else if (WPM % 1 !== 0) {
      WPM = Math.floor(WPM);
    }
    document.getElementById("speedNumber").value = WPM;
  }

  function loadSelection() {
    window.location.reload();
    document.getElementById("speedNumber").value = WPM;
  }

  function createEventListeners() {
    let wordSelect = document.getElementById("stenoWords");
    if (wordSelect.addEventListener) {
      wordSelect.addEventListener("change", stenoWordsSelected, false);
    }

    let phraseSelect = document.getElementById("stenoPhrases");
    if (phraseSelect.addEventListener) {
      phraseSelect.addEventListener("change", stenoPhraseSelected, false);
    }

    let numbersSelected = document.getElementById("stenoNumbers");
    if (numbersSelected.addEventListener) {
      numbersSelected.addEventListener("change", stenoNumbersSelected, false);
    }

    let statesSelected = document.getElementById("stenoStates");
    if (statesSelected.addEventListener) {
      statesSelected.addEventListener("change", stenoStatesSelected, false);
    }

    let yearsSelected = document.getElementById("stenoYears");
    if (yearsSelected.addEventListener) {
      yearsSelected.addEventListener("change", stenoYearsSelected, false);
    }
  }
  window.addEventListener("load", createEventListeners, false);
  // window.onload = function () {
  //   WPM = 60;
  //   document.getElementById("speedNumber").innerHTML = WPM.toString();
  // };

  return (
    <div>
      <p>{WPM} WPM</p>
      <p>Please Select a list:</p>
      <input type="radio" id="stenoWords" name="fav_language" value="Words" />
      <label htmlFor="stenoWords">Words</label>
      <br />
      <input
        type="radio"
        id="stenoNumbers"
        name="fav_language"
        value="Numbers"
      />
      <label htmlFor="stenoNumbers">Numbers</label>
      <br />
      <input
        type="radio"
        id="stenoPhrases"
        name="fav_language"
        value="Phrases"
      />
      <label htmlFor="stenoPhrases">Phrases</label>
      <br />
      <input type="radio" id="stenoStates" name="fav_language" value="States" />
      <label htmlFor="stenoStates">States</label>
      <br />
      <input type="radio" id="stenoYears" name="fav_language" value="Years" />
      <label htmlFor="stenoYears">Years</label>
      <br />
      <br />
      <button onClick={loadSelection}>Clear Selection</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        className={{
          margin: "0 auto",
        }}
      >
        <h1 id="words"></h1>
        <h1 id="inlinePhrases"></h1>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
