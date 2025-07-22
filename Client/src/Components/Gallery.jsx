import React from "react";

const Gallery = ({ onSelect, onClose }) => {
  const handleFileChange = (event) => {

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSelect(reader.result); 
        onClose(); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="gallery-container">
      <input type="file"  accept="image/*" onChange={handleFileChange} />
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
};

export default Gallery;
