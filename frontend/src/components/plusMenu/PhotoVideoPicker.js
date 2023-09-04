// PhotoVideoPicker.js
import React from "react";

function PhotoVideoPicker({ onFileSelect }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="photo_video_picker">
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
    </div>
  );
}

export default PhotoVideoPicker;
