// useTextHandling.js
import { useState, useRef, useEffect } from "react";

export const useTextHandling = (initialText = "") => {
  const [text, setText] = useState(initialText);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.focus();
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // ... other methods like handleEmoji ...

  return {
    text,
    setText,
    cursorPosition,
    setCursorPosition,
    textRef,
    handleTextChange,
    // ... other methods ...
  };
};
