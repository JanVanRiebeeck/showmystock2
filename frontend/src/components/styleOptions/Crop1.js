import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-cropper";

import "cropperjs/dist/cropper.css";
import "./Crop1.css";

export default function Crop1({
  onCancel,
  imageDataUrl,
  imageDimensions,
  onCropComplete,
}) {
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedImageData = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      setCropData(croppedImageData);
      onCropComplete(croppedImageData); // This will hide the Crop1 component in the parent
    }
  };

  const handleCropClick = (event) => {
    event.stopPropagation();
    // Other crop handling logic
  };

  useEffect(() => {
    const image = new Image();
    image.src = imageDataUrl;

    image.onload = function () {
      // Get image width and height
      const imgWidth = imageDimensions.width;
      const imgHeight = imageDimensions.height;

      // Determine aspect ratio
      const aspectRatio = imgWidth / imgHeight;
    };
  }, [imageDataUrl]);

  return (
    <div onClick={handleCropClick}>
      <div className="Crop_Container">
        <div className="crop_container_top">
          <Cropper
            className="crop_image_container"
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            preview=".img-preview"
            src={imageDataUrl}
            ref={cropperRef}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            checkOrientation={false}
          />
        </div>

        <div className="crop_container_bottom">
          <button className="blue_btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="blue_btn" onClick={getCropData}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
