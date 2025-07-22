import React, { useState } from "react";
import Profile from "./Profile";
import Privacy from "./privacy"; 
import Time from "./Time"; 

import "./SettingsPage.css";
import Navbar from "./Navbar";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="settings-container">
        <Navbar />
      <div className="content">
        <nav className="sidebar">
          <ul>
            <li onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "active" : ""}>
              Profile
            </li>
            <li onClick={() => setActiveTab("privacy")} className={activeTab === "privacy" ? "active" : ""}>
              Privacy & Security
            </li>
            <li onClick={() => setActiveTab("time")} className={activeTab === "time" ? "active" : ""}>
              Time Spent
            </li>
          </ul>
          <div className="buttons">
            <button className="delete">Delete Account</button>
            <button className="logout">Logout</button>
            <button className="signup">Sign Up</button>
          </div>
        </nav>
        <main className="main-content">
          {activeTab === "profile" && <Profile />}
          {activeTab === "privacy" && <Privacy />} 
          {activeTab === "time" && <Time />}  
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
