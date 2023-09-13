//plusmenu/PhotoVideoLibrary.js

import ImageEditor from "./ImageEditor";
import { icons } from "./icons";
import { useState, useEffect, useRef } from "react";

export default function PhotoVideoLibrary({
  textHandler,
  setActivePreview,
  activePreview,
}) {
  // --------------------------------------------------------- States --------------------------------------------------------

  const [resetCropFunc, setResetCropFunc] = useState(null);
  const [busyEditingPhoto, setBusyEditingPhoto] = useState(false);
  const [isCropVisible, setIsCropVisible] = useState(false);
  const [imageState, setImageState] = useState({
    selectedFiles: [],
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const fileInputRef = useRef(null);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [images, setImages] = useState([
    //... for all 8 images
    {
      originalUrl: null,
      url: null,
      dimensions: null,
      isCropping: false,
      rotationDegree: 0,
      edits: [],
    },
    {
      originalUrl: null,
      url: null,
      dimensions: null,
      isCropping: false,
      rotationDegree: 0,
      edits: [],
    },
    {
      originalUrl: null,
      url: null,
      dimensions: null,
      isCropping: false,
      rotationDegree: 0,
      edits: [],
    },
    {
      originalUrl: null,
      url: null,
      dimensions: null,
      isCropping: false,
      rotationDegree: 0,
      edits: [],
    },
    {
      originalUrl: null,
      url: null,
      dimensions: null,
      isCropping: false,
      rotationDegree: 0,
      edits: [],
    },
    {
      originalUrl: null,
      url: null,
      dimensions: null,
      isCropping: false,
      rotationDegree: 0,
      edits: [],
    },
    {
      originalUrl: null,
      url: null,
      dimensions: null,
      isCropping: false,
      rotationDegree: 0,
      edits: [],
    },
    {
      originalUrl: null,
      url: null,
      dimensions: null,
      isCropping: false,
      rotationDegree: 0,
      edits: [],
    },
  ]);
  const cropFunctionRef = useRef();
  const { text, setText, textRef } = textHandler;

  // --------------------------------------------------------- Handlers --------------------------------------------------------

  const showCrop = () => {
    setIsCropVisible(true);
  };

  const hideCrop = () => {
    setIsCropVisible(false);
  };

  const toggleCategory = (category) => {
    console.log("toggleCategory");
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  const toggleSubCategory = (subCategory) => {
    console.log("toggleSubCategory");
    if (activeSubCategory === subCategory) {
      setActiveSubCategory(null);
    } else {
      setActiveSubCategory(subCategory);
    }
  };

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);

    // Rename files with timestamps
    const renamedFiles = files.map((file) => {
      const nameParts = file.name.split(".");
      const extension = nameParts.pop();
      const newName = `${nameParts.join(".")}_${Date.now()}.${extension}`;
      return new File([file], newName, {
        type: file.type,
        lastModified: file.lastModified,
      });
    });

    const newTotalFiles = imageState.selectedFiles.length + renamedFiles.length;

    // Ensure the total number of files does not exceed 8
    if (newTotalFiles > 8) {
      alert("You can select up to 8 images only.");
      return;
    }

    const newSelectedFiles = [...imageState.selectedFiles, ...renamedFiles];
    setImageState({ selectedFiles: newSelectedFiles });
    // Update the images state as well with the new files.
    const updatedImages = [...images];
    files.forEach((file, index) => {
      if (file.type.startsWith("image/")) {
        const objectURL = URL.createObjectURL(file);
        updatedImages[imageState.selectedFiles.length + index].url = objectURL;

        // Load image to get its dimensions
        const image = new Image();
        image.onload = () => {
          const containerWidth = 230; // width of .photo_preview_main
          const containerHeight = 230; // height of .photo_preview_main

          if (image.width < containerWidth || image.height < containerHeight) {
            image.classList.add("zoomed-in");
          } else {
            image.classList.remove("zoomed-in");
          }

          // Update the dimensions in the images state for the respective image
          updatedImages[imageState.selectedFiles.length + index].dimensions = {
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

    // Reset the value of the input file element to allow selecting the same file again.
    event.target.value = "";
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

  const onCropIconClick = () => {
    console.log("Check which image we are displaying");
    console.log("close that image in the main view");
    setBusyEditingPhoto(true);
    console.log("Display the cropper in its place");

    showCrop();
  };

  function handleCropCancelFromEditor() {
    setActiveSubCategory(null); // to close the cropping interface
  }

  function getCropDataFromEditor() {
    // Call the function set by Crop4 to initiate the cropping
    if (cropFunctionRef.current) {
      cropFunctionRef.current();
    }
  }

  function handleCropDoneFromEditor() {
    getCropDataFromEditor(); // We will pass this function down
    setBusyEditingPhoto(false);
    setActiveSubCategory("");
  }

  // --------------------------------------------------------- Render Methods --------------------------------------------------------

  const renderFilePreviews = () => {
    if (imageState.selectedFiles.length > 0) {
      const displayedImage =
        selectedImageIndex !== null
          ? images[selectedImageIndex]
          : images[images.length - 1];

      if (displayedImage && displayedImage.url) {
        return (
          <div className="file-preview">
            <img
              src={displayedImage.url}
              alt="Edited Image"
              style={{
                transform: `rotate(${displayedImage.rotationDegree}deg)`,
              }}
            />
          </div>
        );
      }
    }
    return null;
  };

  const renderFileEdits = () => {};

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
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                style={{
                  transform: `rotate(${image.rotationDegree}deg)`,
                }}
              />
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
          <img src={icons.basiceditIcon} alt="Basic Editing" />
        </div>
        <div
          onClick={() => toggleCategory("annotations")}
          className={getMasterIconClass("annotations")}
        >
          <img src={icons.annotationsIcon} alt="Annotations" />
        </div>
        <div
          onClick={() => toggleCategory("emoji_sticker")}
          className={getMasterIconClass("emoji_sticker")}
        >
          <img src={icons.emojiIcon} alt="emoji_sticker" />
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
              onClick={(e) => {
                toggleSubCategory("crop");

                onCropIconClick();
                console.log("Tell ImageCropper to open Cropper");
                e.stopPropagation(); // Stop the click event from propagating up
              }}
              className={getSubIconClass("crop")}
            >
              <img src={icons.cropIcon} alt="Crop" />
            </div>

            <div className={getSubIconClass("rotate")}>
              <img src={icons.rotateIcon} alt="Rotate" />
            </div>
            <div
              onClick={() => toggleSubCategory("brightness")}
              className={getSubIconClass("brightness")}
            >
              <img src={icons.brighnessIcon} alt="brightness" />
            </div>
            <div
              onClick={() => toggleSubCategory("grayscale")}
              className={getSubIconClass("grayscale")}
            >
              <img src={icons.grayscaleIcon} alt="grayscale" />
            </div>
            <div
              onClick={() => toggleSubCategory("vintage")}
              className={getSubIconClass("vintage")}
            >
              <img src={icons.vintageIcon} alt="vintage" />
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
              <img src={icons.pencilIcon} alt="pencil" />
            </div>
            <div
              onClick={() => toggleSubCategory("text")}
              className={getSubIconClass("text")}
            >
              <img src={icons.textIcon} alt="text" />
            </div>
            <div
              onClick={() => toggleSubCategory("eraser")}
              className={getSubIconClass("eraser")}
            >
              <img src={icons.eraserIcon} alt="eraser" />
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
              <img src={icons.emojiIcon} alt="emoji" />
            </div>
            <div
              onClick={() => toggleSubCategory("sticker")}
              className={getSubIconClass("sticker")}
            >
              <img src={icons.stickerIcon} alt="sticker" />
            </div>

            {/* ... other icons */}
          </>
        );
      default:
        return null;
    }
  };

  const getMasterIconClass = (category) => {
    return activeCategory === category ? "active-border" : "";
  };

  const getSubIconClass = (subCategory) => {
    return activeSubCategory === subCategory ? "active-border" : "";
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
                src={icons.gobackIcon}
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
                  {imageState.selectedFiles.length > 0
                    ? "Add more"
                    : "Choose files"}
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

  return (
    <div>
      {/* ... your photo and video library JSX here ... */}
      <div className="photo_container">
        <div className="photo_container_item1">
          <div></div>
          <div className="heading">Select Photo or Video</div>
          <img
            src={icons.gobackIcon}
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

          {busyEditingPhoto === false && (
            <div className="photo_preview_main">
              <div className="file-previews">{renderFilePreviews()}</div>
            </div>
          )}
          {busyEditingPhoto === true && (
            <div className="photo_preview_main">
              <ImageEditor
                images={images}
                setImages={setImages}
                selectedImageIndex={selectedImageIndex}
                imageState={imageState}
                setImageState={setImageState}
                toggleSubCategory={toggleSubCategory}
                activeSubCategory={activeSubCategory}
                setActiveSubCategory={setActiveSubCategory}
                isCropVisible={isCropVisible}
                showCrop={showCrop}
                hideCrop={hideCrop}
                setResetCropFunc={setResetCropFunc}
                getCropDataFromEditor={getCropDataFromEditor}
                cropFunctionRef={cropFunctionRef}
              />
            </div>
          )}

          {busyEditingPhoto === false && (
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
                {imageState.selectedFiles.length > 0
                  ? "Add more"
                  : "Choose files"}
              </button>
            </div>
          )}
          {busyEditingPhoto === true && (
            <div className="ImageCancelResetDone">
              <img
                src={icons.cancelIcon}
                alt=""
                onClick={() => {
                  handleCropCancelFromEditor();
                  setBusyEditingPhoto(false);
                  setActiveSubCategory("");
                }}
              />

              <img
                src={icons.doneIcon}
                alt=""
                onClick={() => {
                  handleCropDoneFromEditor();
                }}
              />
            </div>
          )}

          <div className="photo_preview_list">{renderFileList()}</div>
          {busyEditingPhoto === false && (
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
          )}
        </div>
      </div>
    </div>
  );
}
