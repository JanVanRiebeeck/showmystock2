//plusMeny/ImageEditor.js

import { useState, useEffect, useRef } from "react";
import Crop4 from "../styleOptions/Crop4";

export default function ImageEditor({
  images,
  setImages,
  selectedImageIndex,
  imageState,
  setImageState,
  toggleSubCategory,
  setActiveSubCategory,
  activeSubCategory,
  isCropVisible,
  showCrop,
  hideCrop,
  getCropDataFromEditor,
  cropFunctionRef,
}) {
  // --------------------------------------------------------- States --------------------------------------------------------
  // Rotating state
  const [rotationDegree, setRotationDegree] = useState(0);

  // --------------------------------------------------------- Handlers --------------------------------------------------------

  const handleCropComplete = (croppedImageDataUrl) => {
    let updatedImages = [...images];
    updatedImages[selectedImageIndex].url = croppedImageDataUrl;
    setImages(updatedImages);
  };

  /** handleRotateClick
   * Rotates the currently selected image by 90 degrees.
   * If the image has been rotated previously, it adds another 90 degrees to the rotation.
   */

  function handleRotateClick() {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      if (selectedImageIndex !== null) {
        updatedImages[selectedImageIndex].rotationDegree =
          (updatedImages[selectedImageIndex].rotationDegree + 90) % 360;
      }
      return updatedImages;
    });
  }

  /** getRotatedImage
   * Returns a Promise that resolves with the data URL of the rotated image.
   *
   * @param {string} imageSrc - The source URL of the image to rotate.
   * @param {number} rotationDegree - The degree to rotate the image.
   * @returns {Promise<string>} - A promise that resolves with the data URL of the rotated image.
   */

  function getRotatedImage(imageSrc, rotationDegree) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const { width, height } = image;

        // Adjust canvas dimensions based on rotation
        if (rotationDegree % 180 === 0) {
          canvas.width = width;
          canvas.height = height;
        } else {
          canvas.width = height;
          canvas.height = width;
        }

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotationDegree * Math.PI) / 180);
        ctx.drawImage(image, -width / 2, -height / 2);

        resolve(canvas.toDataURL());
      };
      image.src = imageSrc;
    });
  }

  /** handleCropCancel
   * Handles the cancellation of the cropping action.
   * Resets the active sub-category to null, effectively closing the cropping interface.
   */

  /** dataURLtoBlob
   * Converts a data URL to a Blob object.
   *
   * @param {string} dataurl - The data URL to convert.
   * @returns {Blob} - The resulting Blob object.
   */

  function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  /** Add Edit to 'edits' array */
  function addEdit(imageIndex, editAction) {
    setImages((prevImages) => {
      // Clone the images array
      const updatedImages = [...prevImages];

      // Access the specific image by its index
      const image = updatedImages[imageIndex];

      // Add the edit action to the image's edits array
      image.edits.push(editAction);

      return updatedImages;
    });
  }

  // --------------------------------------------------------- Render Methods --------------------------------------------------------

  return (
    <div>
      {activeSubCategory === "crop" &&
        selectedImageIndex !== null &&
        images[selectedImageIndex] &&
        isCropVisible && (
          <Crop4
            imageDataUrl={images[selectedImageIndex].url}
            imageDimensions={images[selectedImageIndex].dimensions}
            onCropComplete={handleCropComplete}
            getCroppedImage={getCropDataFromEditor}
            cropFunctionRef={cropFunctionRef}
          />
        )}
    </div>
  );
}
