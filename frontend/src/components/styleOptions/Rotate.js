import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { Image, Stage, Layer, Rect, Transformer } from "react-konva";
import Konva from "konva";

export default function Rotate(imageDataUrl, imageDimensions) {
  // --------------------------------------------------------- States --------------------------------------------------------

  const [image] = useState(new window.Image());

  // --------------------------------------------------------- REFS --------------------------------------------------------
  const shapeRef = useRef();
  const trRef = useRef();

  // --------------------------------------------------------- States --------------------------------------------------------

  // --------------------------------------------------------- Effects --------------------------------------------------------

  useEffect(() => {
    image.src = imageDataUrl;
    image.onload = () => {
      // Force a refresh on the layer to display the image
      shapeRef.current.getLayer().batchDraw();
    };
  }, [imageDataUrl]);

  useEffect(() => {
    let rotaterIcon;
    const path = imageDataUrl;

    const tr = trRef.current;
    tr.nodes([shapeRef.current]);

    tr.update = function () {
      Konva.Transformer.prototype.update.call(tr);
      var rot = tr.findOne("rotater");

      if (rot) {
        rot.setStrokeWidth(10);
        rot.setStroke("blue");
        rot.setCornerRadius(5);

        const rotaterIcon = tr.findOne("rotater-icon");

        const path = imageDataUrl;
      }

      if (!rotaterIcon) {
        const icon = new Konva.Path({
          fill: "red",
          data: path,
          name: "rotater-icon",
        });
        icon.position(rot.position());
        icon.x(rot.x() - 5.25);
        icon.y(rot.y() - 5.25);
        trRef.current.add(icon);
      } else {
        rotaterIcon.position(rot.position());
        rotaterIcon.x(rot.x() - 5.25);
        rotaterIcon.y(rot.y() - 5.25);
      }
    };
    tr.update();
    tr.getLayer().batchDraw();
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image x={50} y={70} image={image} ref={shapeRef} draggable />
        <Transformer ref={trRef} />
      </Layer>
    </Stage>
  );
}
