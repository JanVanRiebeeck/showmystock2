import { useState, useEffect, useRef } from "react";

import { Image, Stage, Layer, Rect, Transformer } from "react-konva";
import "./Rotate.css";

import useImage from "use-image";

export default function Rotate({ imageDataUrl, setEditing, imageDimensions }) {
  // --------------------------------------------------------- States --------------------------------------------------------
  const image_width = imageDimensions.width;
  const image_height = imageDimensions.height;

  console.log(imageDimensions);
  console.log(imageDataUrl);

  const imageRef = useRef(null);
  const trRef = useRef(null);

  const [image] = useImage(imageDataUrl);

  // --------------------------------------------------------- States --------------------------------------------------------

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

  return (
    <div className="Rotate_view">
      <Stage width={500} height={450}>
        <Layer>
          <Image
            ref={imageRef}
            x={250} // Center the image horizontally
            y={225} // Center the image vertically
            image={image}
            draggable
            // Set the anchor to the center of the image for rotation
            offsetX={image ? image_width / 2 : 0}
            offsetY={image ? image_height / 2 : 0}
          />
          <Transformer ref={trRef} />
        </Layer>
      </Stage>
    </div>
  );
}
