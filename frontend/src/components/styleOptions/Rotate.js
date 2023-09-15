import { useState, useEffect, useRef } from "react";

import { Image, Stage, Layer, Rect, Transformer } from "react-konva";
import "./Rotate.css";

import useImage from "use-image";

export default function Rotate({
  imageDataUrl,
  setEditing,
  imageDimensions,
  onRotateComplete,
  rotateFunctionRef,
}) {
  // --------------------------------------------------------- States --------------------------------------------------------
  const MAX_HEIGHT = 220;
  const aspectRatio = imageDimensions.width / imageDimensions.height;

  let displayWidth, displayHeight;

  if (imageDimensions.height > MAX_HEIGHT) {
    displayHeight = MAX_HEIGHT;
    displayWidth = MAX_HEIGHT * aspectRatio;
  } else {
    displayWidth = imageDimensions.width;
    displayHeight = imageDimensions.height;
  }

  const imageRef = useRef(null);
  const trRef = useRef(null);

  const [image] = useImage(imageDataUrl);

  // --------------------------------------------------------- States --------------------------------------------------------

  // --------------------------------------------------------- Handlers --------------------------------------------------------
  const getRotateData = () => {
    if (typeof imageRef.current !== "undefined") {
      const degree = imageRef.current.rotation();
      console.log(degree);

      onRotateComplete(degree);
    }
  };

  // --------------------------------------------------------- Effects --------------------------------------------------------
  useEffect(() => {
    if (imageRef.current) {
      // Force a refresh on the layer after the image is loaded
      imageRef.current.getLayer().batchDraw();
    }
  }, [image]);

  useEffect(() => {
    if (trRef.current && imageRef.current) {
      // Attach the transformer to the image
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [imageRef, trRef]);

  useEffect(() => {
    // Assign the rotating function to the ref
    if (rotateFunctionRef) {
      rotateFunctionRef.current = getRotateData;
    }
  }, []);

  return (
    <div className="Rotate_view">
      <Stage width={500} height={450}>
        <Layer>
          <Image
            ref={imageRef}
            x={250 - displayWidth / 4}
            y={225 - displayHeight / 2.5}
            width={displayWidth}
            height={displayHeight}
            image={image}
            draggable
            // Set the anchor to the center of the image for rotation
            offsetX={displayWidth / 4}
            offsetY={displayHeight / 4}
          />
          <Transformer ref={trRef} />
        </Layer>
      </Stage>
    </div>
  );
}
