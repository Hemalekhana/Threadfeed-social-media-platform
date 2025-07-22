import React from "react";

const Publish = ({ title, selectedImage, aiImage, description }) => {
  return (
    <div className="published-post">
      <div className="post-header">
        <div className="profile-section">
          <img
            src="https://static2.bigstockphoto.com/9/8/2/large1500/289640884.jpg"
            alt="Profile"
            className="profile-pic"
          />
          <span className="profile-name">John Doe</span>
        </div>
        <h2 className="post-title">{title}</h2>
      </div>

      
      {selectedImage && <img src={selectedImage} alt="Selected" className="post-image" />}
      {aiImage && <img src={aiImage} alt="AI Generated" className="post-image" />}

      
      <p className="post-description">{description}</p>

      
      <div className="post-actions">
        <button className="like-btn">❤ Like</button>
        <button className="comment-btn">💬 Comment</button>
        <button className="share-btn">🔄 Share</button>
      </div>
    </div>
  );
};

export default Publish;
