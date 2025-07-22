import React, { useState } from "react";
import { ChevronDown, Camera, Image as ImageIcon, Smile } from "lucide-react";
import CameraComponent from "./Camera";
import Gallery from "./Gallery";
import Ai from "./Ai"; 
import Emojis from "./Emojis";
import "./CreatPost.css";
import Navbar from "./Navbar";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [description, setDescription] = useState("");
  const [aiImage, setAiImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [published, setPublished] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [shared, setShared] = useState(false);

  const addEmoji = (emoji) => {
    setDescription((prev) => prev + emoji); 
    setShowEmojiPicker(false); 
  };

  const handleCategoryChange = (option) => {
    setCategory(option);
    setShowDropdown(false);

    if (option === "Camera") {
      setShowCamera(true);
      setShowGallery(false);
    } else if (option === "Gallery") {
      setShowGallery(true);
      setShowCamera(false);
    }
  };

  const handleCapture = (image) => {
    setSelectedImage(image);
    setShowCamera(false); 
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setShowGallery(false); 
  };

  
  const toggleLike = () => setLiked(!liked);
  const toggleCommentBox = () => setShowCommentBox(!showCommentBox);
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };
  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="whole"><Navbar />
    <div className="container">
      <div className="left-section">  
        <div className="title-category-wrapper">
          <input
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />

          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setShowDropdown(!showDropdown)}>
              {category} <ChevronDown size={16} />
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => handleCategoryChange("Camera")}>
                  <Camera size={18} /> Camera
                </div>
                <div className="dropdown-item" onClick={() => handleCategoryChange("Gallery")}>
                  <ImageIcon size={18} /> Gallery
                </div>
              </div>
            )}
          </div>
        </div>

        
        <div className="description-box">
          <textarea
            placeholder="Write a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
            onFocus={() => setShowEmojiPicker(false)}
          ></textarea>

          
          <div className="emoji-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Smile size={24} />
          </div>
          {showEmojiPicker && <Emojis onSelect={addEmoji} />}
        </div>

        
        <Ai setAiImage={setAiImage} /> 

        
        <button className="publish-btn" onClick={() => setPublished(true)}>Publish</button>
      </div>

      
      <div className="right-section">
        
        {!published && showCamera && <CameraComponent onCapture={handleCapture} onClose={() => setShowCamera(false)} />}
        {!published && showGallery && <Gallery onSelect={handleImageSelect} onClose={() => setShowGallery(false)} />}

        
        {published && (
          <div className="published-post">
            <div className="post-header">
              
              <h2 className="post-title">{title}</h2>

              
              <div className="profile-section">
                <img
                  src="https://static2.bigstockphoto.com/9/8/2/large1500/289640884.jpg" 
                  alt="Profile"
                  className="profile-pic"
                />
                <span className="profile-name">John Doe</span>
              </div>
            </div>

            
            {selectedImage && <img src={selectedImage} alt="Selected" className="post-image" />}
            {aiImage && <img src={aiImage} alt="AI Generated" className="post-image" />}

            
            <p className="post-description">{description}</p>

            
            <div className="post-actions">
              <button className="like-btn" onClick={toggleLike}>
                {liked ? "❤ Liked" : "🤍 Like"}
              </button>
              <button className="comment-btn" onClick={toggleCommentBox}>💬 Comment</button>
              <button className="share-btn" onClick={handleShare}>🔄 Share</button>
            </div>

            
            {showCommentBox && (
              <div className="comment-section">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="comment-input"
                />
                <button className="comment-submit-btn" onClick={handleCommentSubmit}>Post</button>
              </div>
            )}
            <ul className="comment-list">
              {comments.map((comment, index) => (
                <li key={index} className="comment-item">💬 {comment}</li>
              ))}
            </ul>

            
            {shared && <p className="share-message">✅ Post Shared!</p>}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default CreatePost;
