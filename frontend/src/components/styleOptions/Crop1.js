import React, { useState, useEffect, useRef } from "react";
import "./Crop1.css";

export default function Crop1({ onCancel, imageDataUrl, imageDimensions }) {
  const image_aspect_rateio = imageDimensions.height / imageDimensions.width;

  const [isDragging, setIsDragging] = useState(false);
  const [cropSize, setCropSize] = useState({ width: "90%", height: "90%" });

  const topLeftTriangleRef = useRef(null);
  const bottomRightTriangleRef = useRef(null);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    console.log("dragging start");

    if (
      e.target === topLeftTriangleRef.current ||
      e.target === bottomRightTriangleRef.current
    ) {
      document.body.style.cursor = "grabbing"; // Set the cursor to grabbing
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      console.log("Busy Dragging");
      // Calculate the difference in mouse position
      const diffX = e.movementX;
      const diffY = e.movementY;

      // Adjust the crop area
      setCropSize((prevSize) => ({
        width: `calc(${prevSize.width} + ${diffX}px)`,
        height: `calc(${prevSize.height} + ${diffY}px)`,
      }));
    }
  };
  const handleMouseUp = () => {
    console.log("dragging end");
    setIsDragging(false);
    document.body.style.cursor = ""; // Reset the cursor
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const isPortrait = imageDimensions.height > imageDimensions.width;

  useEffect(() => {
    const image = new Image();
    image.src = imageDataUrl;

    image.onload = function () {
      // Get image width and height
      const imgWidth = imageDimensions.width;
      const imgHeight = imageDimensions.height;

      // Determine aspect ratio
      const aspectRatio = imgWidth / imgHeight;

      if (aspectRatio > 1) {
        // Image is landscape
        setCropSize({ width: `${imgWidth}px`, height: `${imgHeight}px` });
      } else {
        // Image is portrait or square
        setCropSize({ height: `${imgHeight}px`, width: `${imgWidth}px` });
      }
    };
  }, [imageDataUrl]);

  return (
    <div className="Crop_Container" onClick={stopPropagation}>
      <div className="crop_container_top">
        <div
          className="crop_image_container"
          style={
            isPortrait
              ? { width: "auto", height: "90%" }
              : { width: "90%", height: "auto" }
          }
        >
          {imageDataUrl ? (
            <img
              src={imageDataUrl}
              alt="Crop preview"
              className={isPortrait ? "portrait" : "landscape"}
            />
          ) : (
            <p>No image selected</p>
          )}

          <div
            className="triangle top-left"
            ref={topLeftTriangleRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></div>

          <div
            className="triangle bottom-right"
            ref={bottomRightTriangleRef}
            onMouseDown={handleMouseDown}
          ></div>
        </div>
      </div>
      <div className="crop_container_middle">
        <button className="blue_btn">Reset</button>
      </div>
      <div className="crop_container_bottom">
        <button className="blue_btn" onClick={onCancel}>
          Cancel
        </button>

        <button className="blue_btn">Done</button>
      </div>
    </div>
  );
}
