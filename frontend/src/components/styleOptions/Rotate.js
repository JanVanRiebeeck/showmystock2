import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { Image, Stage, Layer, Rect, Transformer } from "react-konva";
import Konva from "konva";
import rotate2Icon from "../../../src/styles/icons/icons8-rotate2-64.png";
import useImage from "use-image";

export default function Rotate({ imageDataUrl, setEditing, setImageDataUrl }) {
  // --------------------------------------------------------- States --------------------------------------------------------

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
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image
            ref={imageRef}
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            image={image}
            draggable
            // Set the anchor to the center of the image for rotation
            offsetX={image ? image.width / 2 : 0}
            offsetY={image ? image.height / 2 : 0}
          />
          <Transformer ref={trRef} />
        </Layer>
      </Stage>
      <button onClick={() => setEditing(false)}>Done</button>
    </div>
  );
}
