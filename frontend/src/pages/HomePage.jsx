/* eslint-disable no-func-assign */
import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import Axios from "axios";
import "../css/practice.css";

const getCloud = () =>
  `test because court defendant jury trial charge three men lawyers earth fire paraphernalia unfortunately solemn`
    .split(" ")
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

function Word(props) {
  const { text, active, correct } = props;

  if (correct === true) {
    return <span className="word-correct">{text} </span>;
  }

  if (correct === false) {
    return <span className="word-incorrect">{text} </span>;
  }

  if (active) {
    return <span className="word-active">{text} </span>;
  }

  return <span>{text} </span>;
}

Word = React.memo(Word);

function Timer(props) {
  const { correctWords, startCounting } = props;
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [startCounting]);

  const minutes = timeElapsed / 60;

  return (
    <div>
      <p>Time: {timeElapsed}</p>
      <p>Speed: {(correctWords / minutes || 0).toFixed(0)} WPM</p>
    </div>
  );
}

/**
 * @author Chris P
 * @component Home Page and Practice Session
 **/
export default function HomePage() {
  const [userInput, setUserInput] = useState("");
  // const [itemQueue, setItemQueue] = useState([]);
  const cloud = useRef(getCloud());
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCounting, setStartCounting] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     await Axios.get("http://localhost:4000/listItems").then((res) => {
  //       setItemQueue(res.data.listItems);
  //     });
  //   }
  //   fetchData();
  // }, []);

  function processInput(value) {
    if(activeWordIndex === cloud.current.length) {
      return
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
            <div className="practice-top-buttons">
              <a href="/#">Restart Session</a>
              <a href="/#">Select List</a>
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
