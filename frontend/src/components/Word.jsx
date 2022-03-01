import React from "react";

export default function Word(props) {
  const { active, correct, currentLine, currentWord } = props;

  function processWord(word) {
    if (correct === true) {
      return <span className="word-correct">{word} </span>;
    }

    if (correct === false) {
      return <span className="word-incorrect">{word} </span>;
    }

    if (active) {
      return <span className="word-active">{word} </span>;
    }
  }

  return (
    <div style={{ backgroundColor: "#eeeef0" }}>
      {currentLine.map(function (word, index) {
        // TODO: fix problem where first word is skipped on new line
        // console.log(processWord(currentWord).props.children[0]);
        return currentWord === word ? (
          <span key={index}>{processWord(currentWord)}</span>
        ) : (
          <span key={index}>{word}&nbsp;</span>
        );
      })}
    </div>
  );
}
