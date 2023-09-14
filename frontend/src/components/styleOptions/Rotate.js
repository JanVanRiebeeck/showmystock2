import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import Konva from "konva";

export default function Rotate(imageDataUrl, imageDimensions) {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    const tr = trRef.current;
    tr.nodes([shapeRef.current]);

    tr.update = () => {
      Konva.Transformer.prototype.update.call(tr);
      var rot = tr.findOne("rotater");

      rot.setStrokeWidth(10);
      rot.setStroke("blue");
      rot.setCornerRadius(5);

      const rotaterIcon = tr.findOne("rotater-icon");

      const path = imageDataUrl;

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
        <Rect
          x={50}
          y={70}
          fill="grey"
          width={200}
          height={150}
          ref={shapeRef}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          draggable
        />
        <Transformer ref={trRef} />
      </Layer>
    </Stage>
  );
}
