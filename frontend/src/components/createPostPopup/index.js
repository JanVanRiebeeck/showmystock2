import "./style.css";
import exitIcon from "../../../src/styles/icons/icons8-exit-48.png";
import emojiIcon from "../../../src/styles/icons/icons8-smile-48.png";
import gifIcon from "../../../src/styles/icons/icons8-gif-64.png";
import { useState } from "react";
import Picker from "emoji-picker-react";
import GifSearch from "../gifSearch";

export default function CreatePostPopup({ user }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  //State to control visibility of the emoji-picker
  const [picker, setPicker] = useState(false);
  const [gif_pick, setGifPick] = useState(false);
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

        {!showPrev && (
          <div className="flex_center">
            <textarea
              maxLength="1000"
              value={text}
              placeholder={"Create your post"}
              className="post_input"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        )}
        <div className="post_emojis_wrap">
          {picker && (
            <div className="comment_emoji_picker rlmove">
              <Picker />
            </div>
          )}
          <img src="../../../icons/colorful.png" alt="" />
          <img
            src={gifIcon}
            alt=""
            onClick={() => setGifPick((prev) => !prev)}
          />

          <img
            src={emojiIcon}
            alt=""
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          />
        </div>
        {gif_pick && <GifSearch />}
      </div>
    </div>
  );
}
