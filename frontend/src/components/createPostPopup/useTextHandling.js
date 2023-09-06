// useTextHandling.js
import { useState, useRef, useEffect } from "react";

export const useTextHandling = (initialText = "") => {
  const [text, setText] = useState(initialText);
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.focus();
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleEmoji = (emojiData) => {
    const emoji = emojiData.emoji;
    const ref = textRef.current;
    let selectionStart = ref.selectionStart;

    if (selectionStart === null) {
      selectionStart = text?.length || 0;
    }

    const start = text ? text.substring(0, selectionStart) : "";
    const end = text ? text.substring(selectionStart) : "";
    const newText = start + emoji + end;

    setText(newText);
  };

  return {
    text,
    setText,
    textRef,
    handleTextChange,
    handleEmoji,
  };
};
