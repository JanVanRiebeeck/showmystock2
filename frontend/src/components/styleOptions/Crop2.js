import "./Crop2.css";
import { useRef, useState, useEffect } from "react";

export default function Crop2({
  onAfterCrop,
  imageDataUrl,
  imageDimensions,
  onCancel,
}) {
  const topLeftTriangleRef = useRef(null);
  const bottomRightTriangleRef = useRef(null);
  const topRightTriangleRef = useRef(null);
  const bottomLeftTriangleRef = useRef(null);

  const GRID_SIZE = 1000; // Adjust this value as needed
  const GRID_WIDTH = imageDimensions.width / GRID_SIZE;
  const GRID_HEIGHT = imageDimensions.height / GRID_SIZE;

  const lineTopRef = useRef(null);
  const lineRightRef = useRef(null);
  const lineBottomRef = useRef(null);
  const lineLeftRef = useRef(null);

  const updateLines = () => {
    if (
      !topLeftTriangleRef.current ||
      !topRightTriangleRef.current ||
      !bottomRightTriangleRef.current ||
      !bottomLeftTriangleRef.current ||
      !lineTopRef.current ||
      !lineRightRef.current ||
      !lineBottomRef.current ||
      !lineLeftRef.current
    ) {
      return;
    }

    const topX1 = topLeftTriangleRef.current.offsetLeft;
    const topY1 = topLeftTriangleRef.current.offsetTop;

    const topX2 = topRightTriangleRef.current.offsetLeft;
    const topY2 = topRightTriangleRef.current.offsetTop;

    const rightX1 = topX2;
    const rightY1 = topY2;

    const rightX2 = bottomRightTriangleRef.current.offsetLeft;
    const rightY2 = bottomRightTriangleRef.current.offsetTop;

    const bottomX1 = rightX2;
    const bottomY1 = rightY2;

    const bottomX2 = bottomLeftTriangleRef.current.offsetLeft;
    const bottomY2 = bottomLeftTriangleRef.current.offsetTop;

    const leftX1 = bottomX2;
    const leftY1 = bottomY2;

    const leftX2 = topX1;
    const leftY2 = topY1;

    lineTopRef.current.setAttribute("x1", topX1);
    lineTopRef.current.setAttribute("y1", topY1);
    lineTopRef.current.setAttribute("x2", topX2);
    lineTopRef.current.setAttribute("y2", topY2);

    lineRightRef.current.setAttribute("x1", rightX1);
    lineRightRef.current.setAttribute("y1", rightY1);
    lineRightRef.current.setAttribute("x2", rightX2);
    lineRightRef.current.setAttribute("y2", rightY2);

    lineBottomRef.current.setAttribute("x1", bottomX1);
    lineBottomRef.current.setAttribute("y1", bottomY1);
    lineBottomRef.current.setAttribute("x2", bottomX2);
    lineBottomRef.current.setAttribute("y2", bottomY2);

    lineLeftRef.current.setAttribute("x1", leftX1);
    lineLeftRef.current.setAttribute("y1", leftY1);
    lineLeftRef.current.setAttribute("x2", leftX2);
    lineLeftRef.current.setAttribute("y2", leftY2);
  };

  const [draggedTriangle, setDraggedTriangle] = useState(null);
  const [movingTrianglePosition, setMovingTrianglePosition] = useState({
    x: 0,
    y: 0,
  });
  const initialMousePositionRef = useRef(null);

  const isPortrait = imageDimensions.height > imageDimensions.width;

  const handleMouseDownOnTriangle = (event) => {
    console.log(event.target);

    // Add the 'grabbingCursor' class to the triangle
    event.target.classList.add("grabbingCursor");

    setDraggedTriangle(event.target);
    initialMousePositionRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    document.addEventListener("mousemove", handleMouseDragOnTriangle);
    document.addEventListener("mouseup", handleMouseUpOnTriangle);
  };

  const handleMouseDragOnTriangle = (event) => {
    if (draggedTriangle) {
      const dx = event.clientX - initialMousePositionRef.current.x;
      const dy = event.clientY - initialMousePositionRef.current.y;

      // Get current translations
      const { x: currentX, y: currentY } = getTranslation(draggedTriangle);
      let newLeft = currentX + dx;
      let newTop = currentY + dy;

      // Boundary checks & snap to grid
      const snapToGrid = (value, gridSize) =>
        Math.round(value / gridSize) * gridSize;

      if (draggedTriangle === topLeftTriangleRef.current) {
        newLeft = snapToGrid(Math.max(newLeft, 0), GRID_WIDTH);
        newTop = snapToGrid(Math.max(newTop, 0), GRID_HEIGHT);

        // Update neighboring triangles using translate
        topRightTriangleRef.current.style.transform = `translateY(${newTop}px)`;
        bottomLeftTriangleRef.current.style.transform = `translateX(${newLeft}px)`;
      } else if (draggedTriangle === topRightTriangleRef.current) {
        newLeft = snapToGrid(
          Math.min(newLeft, imageDimensions.width - GRID_WIDTH),
          GRID_WIDTH
        );
        newTop = snapToGrid(Math.max(newTop, 0), GRID_HEIGHT);

        // Update neighboring triangles
        topLeftTriangleRef.current.style.transform = `translateY(${newTop}px)`;
        bottomRightTriangleRef.current.style.transform = `translateX(${newLeft}px)`;
      } else if (draggedTriangle === bottomLeftTriangleRef.current) {
        newLeft = snapToGrid(Math.max(newLeft, 0), GRID_WIDTH);
        newTop = snapToGrid(
          Math.min(newTop, imageDimensions.height - GRID_HEIGHT),
          GRID_HEIGHT
        );

        // Update neighboring triangles
        topLeftTriangleRef.current.style.transform = `translateY(${newTop}px)`;
        bottomRightTriangleRef.current.style.transform = `translateX(${newLeft}px)`;
      } else if (draggedTriangle === bottomRightTriangleRef.current) {
        newLeft = snapToGrid(
          Math.min(newLeft, imageDimensions.width - GRID_WIDTH),
          GRID_WIDTH
        );
        newTop = snapToGrid(
          Math.min(newTop, imageDimensions.height - GRID_HEIGHT),
          GRID_HEIGHT
        );

        // Update neighboring triangles
        topRightTriangleRef.current.style.transform = `translateY(${newTop}px)`;
        bottomLeftTriangleRef.current.style.transform = `translateX(${newLeft}px)`;
      }

      // Apply translations
      draggedTriangle.style.transform = `translateX(${newLeft}px) translateY(${newTop}px)`;

      initialMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      // For neighboring triangles, you'll need a similar logic to calculate their translation based on the dragged triangle's new position.
      updateLines();
    }
  };

  const handleMouseDragOnTopLeftTriangle = (event) => {};
  const handleMouseDragOnTopRightTriangle = () => {};
  const handleMouseDragOnBottomLeftTriangle = () => {};
  const handleMouseDragOnBottomRightTriangle = () => {};

  const handleMouseUpOnTriangle = () => {
    console.log("handleMouseUpOnTriangle");

    // Remove the 'grabbingCursor' class from the triangle
    if (draggedTriangle) {
      draggedTriangle.classList.remove("grabbingCursor");
    }

    document.removeEventListener("mousemove", handleMouseDragOnTriangle);
    document.removeEventListener("mouseup", handleMouseUpOnTriangle);
  };

  // Helper function to extract translation values from a transformed element.
  const getTranslation = (elem) => {
    const style = window.getComputedStyle(elem);
    const transform = style.transform;

    // Ensure we have a matrix format
    if (!transform || !transform.includes("matrix")) {
      return { x: 0, y: 0 }; // default values
    }

    const values = transform
      .match(/matrix.*\((.+)\)/)[1]
      .split(", ")
      .map(parseFloat);

    // Check for correct matrix values length
    if (values.length !== 6) {
      return { x: 0, y: 0 }; // default values
    }

    const [a, b, c, d, tx, ty] = values;

    return {
      x: tx,
      y: ty,
    };
  };

  const handleReset = () => {
    console.log("handleReset");
  };

  const handleCropClick = (event) => {
    event.stopPropagation();
    // Other crop handling logic
  };

  useEffect(() => {
    return () => {
      // Store the initial position of the 4 triangles
    };
  }, []);

  return (
    <div onClick={handleCropClick}>
      <div className="Crop2_Container">
        <div className="crop2_container_top">
          {" "}
          <div className="crop2_Image_Container">
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
            {/* Other elements like triangles will be added here */}
            <svg
              className="cropAreaSVG"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line ref={lineTopRef} stroke="black" strokeWidth="2" />
              <line ref={lineRightRef} stroke="black" strokeWidth="2" />
              <line ref={lineBottomRef} stroke="black" strokeWidth="2" />
              <line ref={lineLeftRef} stroke="black" strokeWidth="2" />
            </svg>

            <div
              className="triangle top-left"
              ref={topLeftTriangleRef}
              onMouseDown={handleMouseDragOnTopLeftTriangle}
            ></div>
            <div
              className="triangle bottom-right"
              ref={bottomRightTriangleRef}
              onMouseDown={handleMouseDownOnTriangle}
            ></div>
            <div
              className="triangle top-right"
              ref={topRightTriangleRef}
              onMouseDown={handleMouseDownOnTriangle}
            ></div>
            <div
              className="triangle bottom-left"
              ref={bottomLeftTriangleRef}
              onMouseDown={handleMouseDownOnTriangle}
            ></div>
          </div>
        </div>
        <div className="crop2_container_middle">
          {" "}
          <button className="blue_btn" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="crop2_container_bottom">
          {" "}
          <div className="crop2_container_bottom">
            <button className="blue_btn" onClick={onCancel}>
              Cancel
            </button>

            <button className="blue_btn">Done</button>
          </div>
        </div>
      </div>
    </div>
  );
}
