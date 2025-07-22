import React from "react";
import Picker from "@emoji-mart/react";

const Emojis = ({ onSelect }) => {
  const handleEmojiSelect = (emoji) => {
    if (emoji && emoji.native) {
      onSelect(emoji.native); 
    } else {
      console.error("Invalid emoji format:", emoji);
    }
  };

  return (
    <div className="emoji-picker">
      <Picker onEmojiSelect={handleEmojiSelect} />
    </div>
  );
};

export default Emojis;
