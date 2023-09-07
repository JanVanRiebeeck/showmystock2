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

    initialMousePositionRef.current = { x: e.clientX, y: e.clientY }; // Store the initial position

    // Check if the target is the top left triangle
    if (e.target === topLeftTriangleRef.current) {
      setIsDragging(true);
      console.log(
        "Hide Original Top Triangle and make a new one that moves with the mouse"
      );
      // How do I hide the original top triangle and show The new triangle (triangle_move.top_left)
      e.target.classList.add("grabbingCursor");
      e.target.style.display = "none"; // Hide original triangle
      setMovingTrianglePosition({
        // Initialize moving triangle position
        x: e.target.getBoundingClientRect().left - 8,
        y: e.target.getBoundingClientRect().top - 8,
      });
      setDraggedTriangle("topLeft"); // Set the state for top-left triangle
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    // Check if the target is the bottom right triangle
    else if (e.target === bottomRightTriangleRef.current) {
      setIsDragging(true);
      console.log("dragging start");
      e.target.classList.add("grabbingCursor");
      setDraggedTriangle("bottomRight"); // Set the state for bottom-right triangle
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseMove = (e) => {
    e.stopPropagation();

    if (isDragging && initialMousePositionRef.current) {
      const deltaX = e.clientX - initialMousePositionRef.current.x;
      const deltaY = e.clientY - initialMousePositionRef.current.y;

      initialMousePositionRef.current = { x: e.clientX, y: e.clientY };
      console.log(initialMousePositionRef);

      // Use getBoundingClientRect() to get the position of the container
      const containerRect = e.target
        .closest(".crop_image_container")
        .getBoundingClientRect();

      if (draggedTriangle === "topLeft") {
        setMovingTrianglePosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
      } else if (draggedTriangle === "bottomRight") {
        // Similar logic for the bottom-right triangle
      }
    }
  };

  const handleMouseUp = (e) => {
    e.stopPropagation();
    initialMousePositionRef.current = null; // Reset initial mouse position
    if (topLeftTriangleRef.current) {
      topLeftTriangleRef.current.classList.remove("grabbingCursor");
    }
    if (bottomRightTriangleRef.current) {
      bottomRightTriangleRef.current.classList.remove("grabbingCursor");
    }
    if (draggedTriangle === "topLeft") {
      topLeftTriangleRef.current.style.display = "block"; // Show original triangle again
    }

    console.log("dragging end");
    setIsDragging(false);
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
    <div onClick={onClick}>
      <div className="Crop_Container">
        <div className="crop_container_top">
          <div
            className="crop_image_container"
            onMouseDown={handleMouseDownOnTriangle}
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
            ></div>

            <div
              className="triangle bottom-right"
              ref={bottomRightTriangleRef}
              onMouseDown={handleMouseDownOnTriangle}
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
    </div>
  );
}
