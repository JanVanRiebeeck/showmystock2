import "./Crop3.css";

export default function Crop3(imageDataUrl, imageDimensions, onCancel) {
  const handleCropClick = (event) => {
    event.stopPropagation();
    // Other crop handling logic
  };
  return (
    <div onClick={handleCropClick}>
      <div className="Crop3_container">
        {" "}
        <div className="crop2_Image_Container">
          {imageDataUrl ? (
            <img src={imageDataUrl} alt="Crop preview" draggable="false" />
          ) : (
            <p>No image selected</p>
          )}
          {/* Other elements like triangles will be added here */}
        </div>
      </div>
    </div>
  );
}
