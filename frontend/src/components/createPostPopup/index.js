import "./style.css";
import exitIcon from "../../../src/styles/icons/icons8-exit-48.png";
import EmojiPickerBackground from "../emojiPickerBackground";
import gifIcon from "../../../src/styles/icons/icons8-gif-64.png";
import plustIcon from "../../../src/styles/icons/icons8-plus-40.png";
import micIcon from "../../../src/styles/icons/icons8-mic-48.png";
import sendIcon from "../../../src/styles/icons/icons8-send-60.png";

import { useState, useRef, useEffect } from "react";
import { useTextHandling } from "./useTextHandling";

import GifSearch from "../gifSearch";

import PlusMenu from "../plusMenu";
import AddPhotoFromCamera from "../addPhoto";

export default function CreatePostPopup({ user }) {
  // This is for handling text in this component
  const { text, setText, textRef, handleTextChange, handleEmoji } =
    useTextHandling();

  // State to control gif and plus handling
  const [gif_pick, setGifPick] = useState(false);
  const [plus_pick, setPlusPick] = useState(false);

  useEffect(() => {
    textRef.current.focus();
  }, []);

  return (
    <div className="blur">
      <div className="post_box">
        <div className="box_header">
          <div className="box_profile">
            <img src={user?.picture} alt="" />
          </div>
          <span>Create Post</span>
          <div className="exits_icon">
            <img src={exitIcon} alt="" />
          </div>
        </div>

        <div className="flex_center">
          <textarea
            maxLength="1000"
            value={text}
            placeholder={"Create your post"}
            className="post_input"
            onChange={(e) => setText(e.target.value)}
            ref={textRef}
          ></textarea>
        </div>

        <div className="box_footer">
          <img
            src={plustIcon}
            alt=""
            onClick={() => setPlusPick((prev) => !prev)}
          />
          {plus_pick && (
            <PlusMenu textHandler={{ text, setText, textRef, handleEmoji }} />
          )}

          <img src={micIcon} alt="" />
          <img
            src={gifIcon}
            alt=""
            onClick={() => setGifPick((prev) => !prev)}
          />
          {gif_pick && <GifSearch />}
          <AddPhotoFromCamera />
          <EmojiPickerBackground
            textHandler={{ text, setText, handleEmoji }}
            textRef={textRef}
          />

          {text.trim().length > 0 && <img src={sendIcon} alt="" />}
        </div>
      </div>
    </div>
  );
}
