import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css"; // Import the required CSS for the cropping tool
import { useState } from "react";

export default function Crop({ imageUrl, onCrop }) {
  const [cropping, setCropping] = useState(false); // State to toggle cropping mode

  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    aspect: 16 / 9, // You can change this to any aspect ratio you want
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const handleCancel = () => {
    setCropping(false); // Exit cropping mode
  };

  const handleDone = () => {
    makeClientCrop(crop);
    setCropping(false); // Exit cropping mode
  };

  const handleReset = () => {
    // Reset to default crop state or any specific state you want
    setCrop({
      unit: "%",
      width: 50,
      aspect: 16 / 9,
    });
  };

  const onImageLoaded = (image) => {
    // Optional: You can do something when the image is loaded
  };

  const onComplete = (crop) => {
    // You could also use this to update the crop state
  };

  const onCropChange = (crop, percentCrop) => {
    // Adjust the state accordingly
    setCrop(crop);
  };

  const getCroppedImg = (imageSrc, crop, fileName) => {
    const image = new Image();
    image.src = imageSrc;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          // Reject if not blob is returned
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const makeClientCrop = async (crop) => {
    if (imageUrl && crop.width && crop.height) {
      const croppedImageBlob = await getCroppedImg(
        imageUrl,
        crop,
        "newFile.jpeg"
      );
      const croppedImageUrl = URL.createObjectURL(croppedImageBlob);
      setCroppedImageUrl(croppedImageUrl);
      onCrop && onCrop(croppedImageUrl); // Call the onCrop function passed as a prop
    }
  };

  // ... Add the getCroppedImg function that would convert the crop into an actual image ...

  return (
    <div className="crop_container">
      {cropping ? (
        <>
          <ReactCrop
            src={imageUrl}
            crop={crop}
            onImageLoaded={onImageLoaded}
            onComplete={onComplete}
            onChange={onCropChange}
          />
          <div className="crop_buttons">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleDone}>Done</button>
          </div>
        </>
      ) : (
        <img
          src={imageUrl}
          alt="Uploaded preview"
          onClick={() => setCropping(true)}
        />
      )}
    </div>
  );
}
