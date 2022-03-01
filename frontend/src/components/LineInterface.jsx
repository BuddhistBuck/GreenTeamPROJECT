import React, { useEffect, useState } from "react";

function LineInterface(props) {
  const { text } = props;

  // Detect correct string matches
  const [correctMatch, setCorrectMatch] = useState("");
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    setCorrectMatch(text[0].props.children);
    setRemaining(text[1]);
    // console.log(`correctMatch: ${correctMatch} || remaining: ${remaining}`);
  }, [text]);

  return (
    <div style={{ backgroundColor: "#eeeef0" }}>
      <strong>{correctMatch}</strong>
      <span>{remaining}</span>
    </div>
  );
}

export default LineInterface;
