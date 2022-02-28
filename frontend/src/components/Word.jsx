import React from 'react';

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

export default Word;