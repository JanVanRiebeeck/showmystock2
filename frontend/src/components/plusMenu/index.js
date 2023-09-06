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
import slideshowIcon from "../../../src/styles/icons/icons8-slideshow-64.png";
import voiceoverIcon from "../../../src/styles/icons/icons8-voiceover-64.png";
import rotateIcon from "../../../src/styles/icons/icons8-rotate-right-48.png";
import brighnessIcon from "../../../src/styles/icons/icons8-brightness-64.png";
import grayscaleIcon from "../../../src/styles/icons/icons8-grayscale-100.png";
import vintageIcon from "../../../src/styles/icons/icons8-old-fashioned-family-photo-48.png";
import previewIcon from "../../../src/styles/icons/icons8-preview-64.png";
import undoIcon from "../../../src/styles/icons/icons8-undo-40.png";
import redoIcon from "../../../src/styles/icons/icons8-redo-40.png";
import basiceditIcon from "../../../src/styles/icons/icons8-edit-image-40.png";
import annotationsIcon from "../../../src/styles/icons/icons8-paint-palette-40.png";
import eraserIcon from "../../../src/styles/icons/icons8-eraser-64.png";

import { useState, useEffect, useRef } from "react";
import { Emoji } from "emoji-picker-react";

import Crop1 from "../styleOptions/Crop1";

export default function PlusMenu({ textHandler }) {
  const [activePreview, setActivePreview] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [images, setImages] = useState([
    //... for all 8 images
    { url: null, dimensions: null, isCropping: false },
    { url: null, dimensions: null, isCropping: false },
    { url: null, dimensions: null, isCropping: false },
    { url: null, dimensions: null, isCropping: false },
    { url: null, dimensions: null, isCropping: false },
    { url: null, dimensions: null, isCropping: false },
    { url: null, dimensions: null, isCropping: false },
    { url: null, dimensions: null, isCropping: false },
  ]);

  const { text, setText, textRef } = textHandler;

  const toggleCategory = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  const toggleSubCategory = (subCategory) => {
    if (activeSubCategory === subCategory) {
      setActiveSubCategory(null);
    } else {
      setActiveSubCategory(subCategory);
    }
  };

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    const newTotalFiles = selectedFiles.length + files.length;

    // Ensure the total number of files does not exceed 8
    if (newTotalFiles > 8) {
      alert("You can select up to 8 images only.");
      return;
    }

    const newSelectedFiles = [...selectedFiles, ...files];
    setSelectedFiles(newSelectedFiles);

    // Update the images state as well with the new files.
    const updatedImages = [...images];
    files.forEach((file, index) => {
      if (file.type.startsWith("image/")) {
        const objectURL = URL.createObjectURL(file);
        updatedImages[selectedFiles.length + index].url = objectURL;

        // Load image to get its dimensions
        const image = new Image();
        image.onload = () => {
          // Update the dimensions in the images state for the respective image
          updatedImages[selectedFiles.length + index].dimensions = {
            width: image.width,
            height: image.height,
          };
          setImages(updatedImages); // Update the state with new dimensions
        };
        image.src = objectURL;
      }
    });

    // Set the selected image index to the last image.
    const lastIndex = newSelectedFiles.length - 1;
    setSelectedImageIndex(lastIndex);

    // Set the image data URL for the cropping component.
    const file = newSelectedFiles[lastIndex];
    if (file && file.type.startsWith("image/")) {
      const image = new Image();
      image.onload = () => {
        setImageDimensions({
          width: image.width,
          height: image.height,
        });
      };
      image.src = URL.createObjectURL(file);
      setImageDataUrl(image.src);
    }
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
    const file = images[index];
    if (file && file.url) {
      setImageDataUrl(file.url);

      // Also, update the dimensions if available
      if (file.dimensions) {
        setImageDimensions(file.dimensions);
      } else {
        // If dimensions are not yet available, fetch them
        const image = new Image();
        image.onload = () => {
          setImageDimensions({
            width: image.width,
            height: image.height,
          });

          // Also update the dimensions in the images list for future reference.
          const updatedImages = [...images];
          updatedImages[index].dimensions = {
            width: image.width,
            height: image.height,
          };
          setImages(updatedImages);
        };
        image.src = file.url;
      }
    }
  };

  const renderFileList = () => {
    return images.map((image, index) => {
      if (image.url) {
        return (
          <div
            key={index}
            className={`file-preview ${
              index === selectedImageIndex ? "selected" : ""
            }`}
            onClick={() => handleImageClick(index)}
          >
            <div className="thumbnail-container">
              <img src={image.url} alt={`Image ${index + 1}`} />
            </div>
          </div>
        );
      }
      return null;
    });
  };

  const renderMasterIcons = () => {
    if (selectedImageIndex === null) return null; // Don't render if no image is selected
    return (
      <div className="photo_styling_master">
        <div
          onClick={() => toggleCategory("basicEditing")}
          className={getMasterIconClass("basicEditing")}
        >
          <img src={basiceditIcon} alt="Basic Editing" />
        </div>
        <div
          onClick={() => toggleCategory("annotations")}
          className={getMasterIconClass("annotations")}
        >
          <img src={annotationsIcon} alt="Annotations" />
        </div>
        <div
          onClick={() => toggleCategory("emoji_sticker")}
          className={getMasterIconClass("emoji_sticker")}
        >
          <img src={emojiIcon} alt="emoji_sticker" />
        </div>
      </div>
    );
  };

  const renderSubIcons = () => {
    switch (activeCategory) {
      case "basicEditing":
        return (
          <>
            <div
              onClick={() => {
                toggleSubCategory("crop");
              }}
              className={getSubIconClass("crop")}
            >
              <img src={cropIcon} alt="Crop" />
              {activeSubCategory === "crop" &&
                selectedImageIndex !== null &&
                images[selectedImageIndex] && (
                  <Crop1
                    onCancel={handleCropCancel}
                    imageDataUrl={images[selectedImageIndex].url}
                    imageDimensions={images[selectedImageIndex].dimensions}
                  />
                )}
            </div>

            <div
              onClick={() => toggleSubCategory("rotate")}
              className={getSubIconClass("rotate")}
            >
              <img src={rotateIcon} alt="Rotate" />
            </div>
            <div
              onClick={() => toggleSubCategory("brightness")}
              className={getSubIconClass("brightness")}
            >
              <img src={brighnessIcon} alt="brightness" />
            </div>
            <div
              onClick={() => toggleSubCategory("grayscale")}
              className={getSubIconClass("grayscale")}
            >
              <img src={grayscaleIcon} alt="grayscale" />
            </div>
            <div
              onClick={() => toggleSubCategory("vintage")}
              className={getSubIconClass("vintage")}
            >
              <img src={vintageIcon} alt="vintage" />
            </div>

            {/* ... other icons */}
          </>
        );
      case "annotations":
        return (
          <>
            <div
              onClick={() => toggleSubCategory("pencil")}
              className={getSubIconClass("pencil")}
            >
              <img src={pencilIcon} alt="pencil" />
            </div>
            <div
              onClick={() => toggleSubCategory("text")}
              className={getSubIconClass("text")}
            >
              <img src={textIcon} alt="text" />
            </div>
            <div
              onClick={() => toggleSubCategory("eraser")}
              className={getSubIconClass("eraser")}
            >
              <img src={eraserIcon} alt="eraser" />
            </div>

            {/* ... other icons */}
          </>
        );
      case "emoji_sticker":
        return (
          <>
            <div
              onClick={() => toggleSubCategory("emoji")}
              className={getSubIconClass("emoji")}
            >
              <img src={emojiIcon} alt="emoji" />
            </div>
            <div
              onClick={() => toggleSubCategory("sticker")}
              className={getSubIconClass("sticker")}
            >
              <img src={stickerIcon} alt="sticker" />
            </div>

            {/* ... other icons */}
          </>
        );
      default:
        return null;
    }
  };

  const renderStyleOption = () => {
    switch (activeSubCategory) {
      case "crop":
        return <Crop1 onCancel={handleCropCancel} />;
    }
  };

  const handleAfterCrop = (croppedData) => {
    // Handle the cropped data (e.g., update state, save, etc.) Replace the original image with the cropped data
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
              <div className="photo_styling_master">
                {selectedImageIndex !== null && renderMasterIcons()}
              </div>
              <div className="photo_styling_sub">
                {activeCategory ? renderSubIcons() : null}
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
                  value={text}
                  placeholder={
                    text.length === 0
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

  const getMasterIconClass = (category) => {
    return activeCategory === category ? "active-border" : "";
  };

  const getSubIconClass = (subCategory) => {
    return activeSubCategory === subCategory ? "active-border" : "";
  };

  function handleCropCancel() {
    setActiveSubCategory(null); // to close the cropping interface
  }

  return <div>{activePreview ? renderPreview() : renderOptions()}</div>;
}
