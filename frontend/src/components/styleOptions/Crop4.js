import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-cropper";

import "cropperjs/dist/cropper.css";

export default function Crop4({
  imageDataUrl,
  imageDimensions,
  onCropComplete,
  getCroppedImage,
  cropFunctionRef,
}) {
  const cropperRef = useRef(null);

  const getCroppedData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedImageDataUrl = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      onCropComplete(croppedImageDataUrl);
    }
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

  useEffect(() => {
    // Assign the cropping function to the ref
    if (cropFunctionRef) {
      cropFunctionRef.current = getCroppedData;
    }
  }, []);

  return (
    <div>
      <Cropper
        style={{
          height: "auto",
          width: "auto",
        }}
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
  );
}
