// plusmenu/index.js

import "./style.css";
import { icons } from "./icons";
import { useState, useEffect, useRef } from "react";
import PhotoVideoLibrary from "./PhotoVideoLibrary";

export default function PlusMenu({ textHandler }) {
  // --------------------------------------------------------- States --------------------------------------------------------

  const [activePreview, setActivePreview] = useState("");

  // --------------------------------------------------------- Render Methods --------------------------------------------------------

  const renderOptions = () => (
    <div className="plus_container">
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("photoVideo")}
      >
        <div className="plus_item_icon">
          <img src={icons.photoIcon} alt="" />
        </div>
        <div className="plus_item_description">Photo & Video Library</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("document")}
      >
        <div className="plus_item_icon">
          <img src={icons.documentIcon} alt="" />
        </div>
        <div className="plus_item_description">Document</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("location")}
      >
        <div className="plus_item_icon">
          <img src={icons.locationIcon} alt="" />
        </div>
        <div className="plus_item_description">Location</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("contact")}
      >
        <div className="plus_item_icon">
          <img src={icons.contactIcon} alt="" />
        </div>
        <div className="plus_item_description">Contact</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("poll")}
      >
        <div className="plus_item_icon">
          <img src={icons.pollIcon} alt="" />
        </div>
        <div className="plus_item_description">Poll</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("color")}
      >
        <div className="plus_item_icon">
          <img src={icons.colorIcon} alt="" />
        </div>
        <div className="plus_item_description">Background Color</div>
      </div>
    </div>
  );

  return (
    <div>
      {activePreview === "photoVideo" ? (
        <PhotoVideoLibrary
          setActivePreview={setActivePreview}
          textHandler={textHandler}
        />
      ) : (
        renderOptions()
      )}
    </div>
  );
}
