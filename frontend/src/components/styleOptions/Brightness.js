import "./Brightness.css";
import { Image, Stage, Layer, Rect, Transformer } from "react-konva";
import { useState, useEffect, useRef } from "react";
import useImage from "use-image";

export default function Brightness(
  imageDataUrl,
  imageDimensions,
  isBrightnessVisible,
  brightnessFunctionRef
) {
  const [image] = useImage(imageDataUrl);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      // Force a refresh on the layer after the image is loaded
      imageRef.current.getLayer().batchDraw();
    }
  }, [image]);

  return (
    <div className="Brightness_view">
      <Stage width={500} height={450}>
        <Layer>
          <Image ref={imageRef} image={image}></Image>
        </Layer>
      </Stage>
    </div>
  );
}
