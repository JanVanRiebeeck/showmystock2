//plusMeny/ImageEditor.js

import { useState, useEffect, useRef } from "react";
import Crop4 from "../styleOptions/Crop4";
import Rotate from "../styleOptions/Rotate";

export default function ImageEditor({
  images,
  setImages,
  selectedImageIndex,

  activeSubCategory,
  isCropVisible,
  isRotateVisible,

  getCropDataFromEditor,
  cropFunctionRef,
  rotateFunctionRef,
}) {
  // --------------------------------------------------------- States --------------------------------------------------------

  // --------------------------------------------------------- Handlers --------------------------------------------------------

  // set The new image URL
  const handleCropComplete = (croppedImageDataUrl) => {
    let updatedImages = [...images];
    updatedImages[selectedImageIndex].url = croppedImageDataUrl;
    setImages(updatedImages);
  };

  // set the new image rotationDegrees - edits: [{ rotationDegree:
  const handleRotateComplete = (degree) => {
    console.log("How much has the image been rotated");
    let updatedImages = [...images];
    updatedImages[selectedImageIndex].edits.rotationDegree = degree;
    setImages(updatedImages);
  };

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
      {activeSubCategory === "rotate" &&
        selectedImageIndex !== null &&
        images[selectedImageIndex] &&
        isRotateVisible && (
          <Rotate
            imageDataUrl={images[selectedImageIndex].url}
            imageDimensions={images[selectedImageIndex].dimensions}
            onRotateComplete={handleRotateComplete}
            rotateFunctionRef={rotateFunctionRef}
          />
        )}
    </div>
  );
}
