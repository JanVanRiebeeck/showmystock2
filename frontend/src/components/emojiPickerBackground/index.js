import "./style.css";
import emojiIcon from "../../../src/styles/icons/icons8-smile-48.png";

import Picker from "emoji-picker-react";
import { useEffect, useState } from "react";

export default function EmojiPickerBackground({ text, setText, textRef }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    if (cursorPosition !== undefined) {
      textRef.current.focus();
    }
  }, [cursorPosition, textRef]);

  const handleEmoji = (emojiData, event) => {
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
    setCursorPosition(selectionStart + emoji.length);
  };

  return (
    <div>
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
  );
}
