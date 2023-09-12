//plusMeny/ImageEditor.js

import { useState, useEffect, useRef } from "react";
import Crop1 from "../styleOptions/Crop1";

export default function ImageEditor({
  images,
  setImages,
  selectedImageIndex,
  imageState,
  setImageState,
  toggleSubCategory,
  setActiveSubCategory,
  activeSubCategory,
}) {
  // --------------------------------------------------------- States --------------------------------------------------------
  // Rotating state
  const [rotationDegree, setRotationDegree] = useState(0);

  // Crop state
  const [isCropVisible, setIsCropVisible] = useState(false);

  const showCrop = () => {
    setIsCropVisible(true);
  };

  const hideCrop = () => {
    setIsCropVisible(false);
  };

  // --------------------------------------------------------- Handlers --------------------------------------------------------

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

  /** handleCropComplete
   * Handles the completion of the cropping action.
   * Updates the state with the cropped image data.
   *
   * @param {string} croppedImageData - The data URL of the cropped image.
   */

  const handleCropComplete = (croppedImageData) => {
    // Make a copy of the images array.
    const updatedImages = [...images];
    // Replace the original image data of the selected image with the cropped data.
    updatedImages[selectedImageIndex].url = croppedImageData;
    // Update the state with the modified images array.
    setImages(updatedImages);

    // Now, update the selectedFiles state with the cropped image.
    const updatedFiles = [...imageState.selectedFiles];
    const newBlob = dataURLtoBlob(croppedImageData); // Convert data URL to blob.
    updatedFiles[selectedImageIndex] = newBlob;
    setImageState.selectedFiles(updatedFiles);

    // Reset the subcategory to none
    toggleSubCategory("");
  };

  /** handleCropCancel
   * Handles the cancellation of the cropping action.
   * Resets the active sub-category to null, effectively closing the cropping interface.
   */

  function handleCropCancel() {
    setActiveSubCategory(null); // to close the cropping interface
  }

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

  // --------------------------------------------------------- Render Methods --------------------------------------------------------

  return (
    <div>
      {activeSubCategory === "crop" &&
        selectedImageIndex !== null &&
        images[selectedImageIndex] &&
        isCropVisible && (
          <Crop1
            imageDataUrl={images[selectedImageIndex].url}
            imageDimensions={images[selectedImageIndex].dimensions}
            onCancel={handleCropCancel}
            onCropComplete={(croppedImageData) => {
              handleCropComplete(croppedImageData);
              hideCrop();
            }}
          />
        )}
    </div>
  );
}
