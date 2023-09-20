import "./Brightness.css";
import { Image, Stage, Layer, Rect, Transformer } from "react-konva";
import useImage from "use-image";

export default function Brightness(imageDataUrl, imageDimensions) {
  const [image] = useImage(imageDataUrl);
  return (
    <div>
      <input
        className="slider"
        type="range"
        min="-10"
        max="10"
        step="0.05"
        value="0"
      />

      <div className="Brightness_view">
        <Stage>
          <Layer>
            <Image image={image}></Image>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
