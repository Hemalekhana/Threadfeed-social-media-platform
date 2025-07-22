import React, { useState } from "react";
import "./SettingsPage.css";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Tell us about yourself...");
  const [image, setImage] = useState(null);

  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  
  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  
  const handleCancel = () => {
    setName("John Doe");
    setBio("Tell us about yourself...");
    setImage(null);
  };

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>
      
      
      <div className="profile-pic-section">
        <img 
          src={image || "https://via.placeholder.com/150"} 
          alt="Profile" 
          className="profile-pic" 
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      
      <div className="profile-field">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

     
      <div className="profile-field">
        <label>Bio:</label>
        <textarea 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
        />
      </div>

      
      <div className="profile-buttons">
        <button className="save-btn" onClick={handleSave}>Save Changes</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Profile;
