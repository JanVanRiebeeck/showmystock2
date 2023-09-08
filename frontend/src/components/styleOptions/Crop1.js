import React, { useState, useEffect, useRef } from "react";
import "./Crop1.css";

export default function Crop1({
  onCancel,
  imageDataUrl,
  imageDimensions,
  onClick,
}) {
  const image_aspect_rateio = imageDimensions.height / imageDimensions.width;

  const [isDragging, setIsDragging] = useState(false);
  const [cropSize, setCropSize] = useState({ width: "90%", height: "90%" });

  const topLeftTriangleRef = useRef(null);
  const bottomRightTriangleRef = useRef(null);
  const cropContainerRef = useRef(null);

  const [draggedTriangle, setDraggedTriangle] = useState(null);
  const [movingTrianglePosition, setMovingTrianglePosition] = useState({
    x: 0,
    y: 0,
  });

  const [containerPosition, setContainerPosition] = useState({
    top: "0%",
    left: "0%",
    right: "0%",
    bottom: "0",
  });

  const initialMousePositionRef = useRef(null);

  const handleMouseDownOnTriangle = (e) => {
    e.stopPropagation();
    initialMousePositionRef.current = { x: e.clientX, y: e.clientY };

    if (e.target === topLeftTriangleRef.current) {
      setIsDragging(true);
      e.target.classList.add("grabbingCursor");
      e.target.style.display = "none";
      setMovingTrianglePosition({
        x: e.target.getBoundingClientRect().left - 8,
        y: e.target.getBoundingClientRect().top - 8,
      });
      setDraggedTriangle("topLeft");
    }
    // Rest of your logic
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownOnContainer = (e) => {
    // Any logic specific to mousedown on the container but not on the triangle.
    // This handler is for future use in case you decide to implement more features.
  };

  const handleMouseMove = (e) => {
    if (isDragging && initialMousePositionRef.current) {
      const deltaX = e.clientX - initialMousePositionRef.current.x;
      const deltaY = e.clientY - initialMousePositionRef.current.y;

      console.log("Mouse move:", { deltaX, deltaY });

      initialMousePositionRef.current = { x: e.clientX, y: e.clientY };

      if (draggedTriangle === "topLeft") {
        setMovingTrianglePosition((prev) => {
          const newPos = {
            x: prev.x + deltaX,
            y: prev.y + deltaY,
          };
          console.log("Updated triangle position:", newPos);
          return newPos;
        });
      } else if (draggedTriangle === "bottomRight") {
        // Similar logic for the bottom-right triangle
      }
    }
  };

  const handleMouseUp = (e) => {
    console.log("Mouse up");
    initialMousePositionRef.current = null; // Reset initial mouse position
    if (topLeftTriangleRef.current) {
      topLeftTriangleRef.current.classList.remove("grabbingCursor");
    }
    if (bottomRightTriangleRef.current) {
      bottomRightTriangleRef.current.classList.remove("grabbingCursor");
    }

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    console.log("dragging end");
    setIsDragging(false);
  };

  const handleReset = () => {
    // Show the original top-left triangle
    if (topLeftTriangleRef.current) {
      topLeftTriangleRef.current.style.display = "block";
    }

    // Hide the moving triangle and reset its position
    setDraggedTriangle(null);
    setMovingTrianglePosition({ x: 0, y: 0 });
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

  useEffect(() => {
    return () => {
      // Cleanup: Remove the event listeners when the component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div onClick={onClick}>
      <div className="Crop_Container">
        <div className="crop_container_top">
          <div
            className="crop_image_container"
            ref={cropContainerRef}
            onMouseDown={handleMouseDownOnContainer}
            style={
              isPortrait
                ? { ...containerPosition, width: "auto", height: "90%" }
                : { ...containerPosition, width: "90%", height: "auto" }
            }
          >
            {imageDataUrl ? (
              <img
                src={imageDataUrl}
                alt="Crop preview"
                draggable="false"
                className={isPortrait ? "portrait" : "landscape"}
              />
            ) : (
              <p>No image selected</p>
            )}

            <div
              className="triangle top-left"
              ref={topLeftTriangleRef}
              onMouseDown={handleMouseDownOnTriangle}
            ></div>
            <div
              className="triangle_move top_left"
              style={{
                left: `${movingTrianglePosition.x}px`,
                top: `${movingTrianglePosition.y}px`,
                display: draggedTriangle === "topLeft" ? "block" : "none",
              }}
            >
              {console.log(
                "Rendered triangle position:",
                movingTrianglePosition
              )}
            </div>

            <div
              className="triangle bottom-right"
              ref={bottomRightTriangleRef}
              onMouseDown={handleMouseDownOnTriangle}
            ></div>
          </div>
        </div>
        <div className="crop_container_middle">
          <button className="blue_btn" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="crop_container_bottom">
          <button className="blue_btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="blue_btn">Done</button>
        </div>
      </div>
    </div>
  );
}
