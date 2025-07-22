import React, { useState } from "react";
import "./Chats.css";
import Navbar from "./Navbar";
const Chats = () => {
  const [chats] = useState([
    { name: "Lekhana", message: "If you could live anywhere in the world, where would it be and why?" },
    { name: "Vasanthi", message: "What’s one experience that completely changed your perspective on life?" },
    { name: "Bhavana", message: "If you could master any skill instantly, what would it be and how would you use it?" },
    { name: "Tulasi", message: "What do you think is the biggest challenge facing humanity today?" },
    { name: "Sravya", message: "If you could go back in time and give your younger self one piece of advice, what would it be?" }
  ]);

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && selectedChat !== null) {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      
      <Navbar />
      
      <div className="chat-list">
        <input type="text" placeholder="Search chats..." className="search-bar" />
        {chats.map((chat, index) => (
          <div key={index} className="chat-item" onClick={() => setSelectedChat(chat)}>
            <strong>{chat.name}</strong>
            <p>{chat.message}</p>
            <hr /> 
          </div>
        ))}
      </div>

      
      <div className="chat-box">
        {selectedChat ? (
          <>
            <h2>Chat with {selectedChat.name}</h2>
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p className="select-chat-msg">Select a chat to view</p>
        )}
      </div>
    </div>
  );
};

export default Chats;
