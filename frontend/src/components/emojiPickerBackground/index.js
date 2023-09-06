import "./style.css";
import emojiIcon from "../../../src/styles/icons/icons8-smile-48.png";

import Picker from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";

export default function EmojiPickerBackground({ textHandler, textRef }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!picker) return; // <-- Add this line. It ensures the rest of the function only runs if the picker is open.
      console.log("user clicked outside");
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [picker]);

  useEffect(() => {
    if (cursorPosition !== undefined) {
      textRef.current.focus();
    }
  }, [cursorPosition, textRef]);

  const handleEmoji = (emojiData, event) => {
    textHandler.handleEmoji(emojiData);
  };

  return (
    <div>
      <div ref={pickerRef}>
        {picker && (
          <div className="comment_emoji_picker rlmove">
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}

        <img
          src={emojiIcon}
          alt=""
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
}
