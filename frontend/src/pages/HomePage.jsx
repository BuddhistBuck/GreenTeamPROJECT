/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-func-assign */
import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import Word from "../components/Word";
import Timer from "../components/Timer";
import { useDetectOutsideClick } from "../util/detectOutsideClick";
// import Axios from "axios";
import "../css/practice.css";

/**
 * @author Chris P
 * @component Home Page and Practice Session
 **/
export default function HomePage() {
  // Practice interface utilities
  const [userInput, setUserInput] = useState("");
  // const [itemQueue, setItemQueue] = useState([]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  const [selectedList, setSelectedList] = useState("");

  const getCloud = (list) =>
    `test because court defendant jury trial charge three men lawyers earth fire paraphernalia unfortunately solemn`
      .split(" ")
      .sort(() => (Math.random() > 0.5 ? 1 : -1));

  const cloud = useRef(getCloud());

  // 'Select List' dropdown utilities
  const dropdownRef = useRef(null);
  const [isDropdownActive, setIsDropdownActive] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const onClick = () => setIsDropdownActive(!isDropdownActive);
  
  const loadTerms = (category) => {
    switch (category) {
      case "medical":
        console.log("medical");
        setSelectedList(
          "test because court defendant jury trial charge three men lawyers earth fire paraphernalia unfortunately solemn"
        );
        return;
      case "court":
        console.log("court");
        setSelectedList(
          "syringe doctor injury concern trouble trauma victim suffocation workplace attack medicine nurse hospital legal"
        );
        return;
      default:
        setSelectedList("none");
        return;
    }
  };

  // 'Restart' button utilities
  function restartSession() {
    window.location.reload();
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     await Axios.get("http://localhost:4000/listItems").then((res) => {
  //       setItemQueue(res.data.listItems);
  //     });
  //   }
  //   fetchData();
  // }, []);

  function processInput(value) {
    if (activeWordIndex === cloud.current.length) {
      return;
    }

    if (!startCounting) {
      setStartCounting(true);
    }

    if (value.endsWith(" ")) {
      // the user has finished the word

      if (activeWordIndex === cloud.current.length) {
        // overflow
        setStartCounting(false);
        setUserInput("List completed");
        return;
      }

      setActiveWordIndex((index) => index + 1);
      setUserInput("");

      // corrected word
      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
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
              <p>
                {cloud.current.map((word, index) => {
                  return (
                    <Word
                      key={index}
                      text={word}
                      active={index === activeWordIndex}
                      correct={correctWordArray[index]}
                    />
                  );
                })}
              </p>
              {/* {itemQueue.map((data, index) => {
                return <p key={index}>{data.text}</p>;
              })} */}
            </div>

            <div className="practice-interface">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
        <div className="practice-side"></div>
      </div>
    </Layout>
  );
}
