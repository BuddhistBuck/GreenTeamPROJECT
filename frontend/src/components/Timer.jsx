import React, { useState, useEffect } from "react";

/**
 * @component The component for the timer features
 * (implements some funcitonality from OldPracticeInterface)
 */
export default function Timer(props) {
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
    <div style={{ position: "absolute", marginTop: "-16px" }}>
      <p>Time: {timeElapsed}</p>
      {/* <p>Speed: {(correctWords / minutes || 0).toFixed(0)} WPM</p> */}
    </div>
  );
}
