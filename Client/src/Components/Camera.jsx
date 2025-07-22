import React, { useState, useRef } from "react";

const CameraComponent = ({ onCapture, onClose }) => {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);  
  const videoRef = useRef(null);

  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      onClose(); 
    }
  };

  
  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png");

    setCapturedImage(image);  
    onCapture(image);  
    stopCamera(); 
  };

  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    onClose();
  };

  return (
    <div className="camera-container">
      {!stream ? (
        <button className="open-btn" onClick={startCamera}>Open Camera</button>
      ) : (
        <>
          <video ref={videoRef} autoPlay className="video-feed"></video>
          <button className="capture-btn" onClick={handleCapture}>Capture</button>
          <button className="close-btn" onClick={stopCamera}>Close</button>
        </>
      )}

      
      {capturedImage && (
        <div className="captured-image">
          <img src={capturedImage} alt="Captured" className="image-preview" />
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
