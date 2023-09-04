import "./style.css";
import photoIcon from "../../../src/styles/icons/icons8-photo-100.png";
import documentIcon from "../../../src/styles/icons/icons8-document-94.png";
import locationIcon from "../../../src/styles/icons/icons8-location-40.png";
import contactIcon from "../../../src/styles/icons/icons8-contact-40.png";
import pollIcon from "../../../src/styles/icons/icons8-poll-64.png";
import colorIcon from "../../../src/styles/icons/icons8-color-wheel-48.png";
import gobackIcon from "../../../src/styles/icons/icons8-go-back-40.png";
import cropIcon from "../../../src/styles/icons/icons8-crop-58.png";
import textIcon from "../../../src/styles/icons/icons8-text-100.png";
import pencilIcon from "../../../src/styles//icons/icons8-pencil-100.png";
import stickerIcon from "../../../src/styles/icons/icons8-sticker-48.png";
import emojiIcon from "../../../src/styles/icons/icons8-smile-48.png";

import { useState, useEffect, useRef } from "react";
import { Emoji } from "emoji-picker-react";

export default function PlusMenu({ currentText, setText }) {
  const [activePreview, setActivePreview] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const textRef = useRef(null);

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    const newTotalFiles = selectedFiles.length + files.length;

    // Ensure the total number of files does not exceed 8
    if (newTotalFiles > 8) {
      alert("You can select up to 8 images only.");
      return;
    }

    setSelectedFiles((prevFiles) => {
      // Update selectedImageIndex to the index of the last added file
      setSelectedImageIndex(prevFiles.length);
      return [...prevFiles, ...files];
    });
  };

  const renderFilePreviews = () => {
    if (selectedFiles.length > 0) {
      const displayedFile =
        selectedImageIndex !== null
          ? selectedFiles[selectedImageIndex]
          : selectedFiles[selectedFiles.length - 1];

      if (displayedFile && displayedFile.type.startsWith("image/")) {
        return (
          <div className="file-preview">
            <img
              src={URL.createObjectURL(displayedFile)}
              alt={displayedFile.name}
            />
          </div>
        );
      }
    }
    return null;
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const renderFileList = () => {
    return selectedFiles.map((file, index) => {
      if (file.type.startsWith("image/")) {
        return (
          <div
            key={index}
            className={`file-preview ${
              index === selectedImageIndex ? "selected" : ""
            }`}
            onClick={() => handleImageClick(index)}
          >
            <div className="thumbnail-container">
              <img src={URL.createObjectURL(file)} alt={file.name} />
            </div>
          </div>
        );
      }
      return null;
    });
  };

  const renderPreview = () => {
    switch (activePreview) {
      case "photoVideo":
        return (
          <div className="photo_container">
            <div className="photo_container_item1">
              <div></div>
              <div className="heading">Select Photo or Video</div>
              <img
                src={gobackIcon}
                alt=""
                onClick={() => setActivePreview("")}
              />
            </div>
            <div className="photo_container_item2">
              <div className="photo_styling">
                <img src={cropIcon} />
                <img src={textIcon} />
                <img src={pencilIcon} />
                <img src={stickerIcon} />
                <img src={emojiIcon} />
              </div>
              <div className="photo_preview_main">
                <div className="file-previews">{renderFilePreviews()}</div>
              </div>
              <div className="photo_send_and_choose">
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFilesChange}
                />
                <button
                  className="blue_btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  {selectedFiles.length > 0 ? "Add more" : "Choose files"}
                </button>
              </div>

              <div className="photo_preview_list">{renderFileList()}</div>
              <div className="photo_add_text">
                <textarea
                  maxLength="1000"
                  value={currentText}
                  placeholder={
                    currentText.length === 0
                      ? "Add text to your photo/video"
                      : "Modify your post"
                  }
                  className="photo_add_text"
                  onChange={(e) => setText(e.target.value)}
                  ref={textRef}
                ></textarea>
              </div>
            </div>
          </div>
        );
      case "document":
        return <div className="box">BOX for Documents</div>;
      case "location":
        return <div className="box">BOX for Location</div>;
      case "contact":
        return <div className="box">BOX for Contacts</div>;
      case "poll":
        return <div className="box">BOX for Polls</div>;
      case "color":
        return <div className="box">BOX for BackgroundColors</div>;
      default:
        return null;
    }
  };

  const renderOptions = () => (
    <div className="plus_container">
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("photoVideo")}
      >
        <div className="plus_item_icon">
          <img src={photoIcon} alt="" />
        </div>
        <div className="plus_item_description">Photo & Video Library</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("document")}
      >
        <div className="plus_item_icon">
          <img src={documentIcon} alt="" />
        </div>
        <div className="plus_item_description">Document</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("location")}
      >
        <div className="plus_item_icon">
          <img src={locationIcon} alt="" />
        </div>
        <div className="plus_item_description">Location</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("contact")}
      >
        <div className="plus_item_icon">
          <img src={contactIcon} alt="" />
        </div>
        <div className="plus_item_description">Contact</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("poll")}
      >
        <div className="plus_item_icon">
          <img src={pollIcon} alt="" />
        </div>
        <div className="plus_item_description">Poll</div>
      </div>
      <div
        className="plus_item hover1"
        onClick={() => setActivePreview("color")}
      >
        <div className="plus_item_icon">
          <img src={colorIcon} alt="" />
        </div>
        <div className="plus_item_description">Background Color</div>
      </div>
    </div>
  );

  return <div>{activePreview ? renderPreview() : renderOptions()}</div>;
}
