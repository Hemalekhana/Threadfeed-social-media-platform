import React, { useState } from "react";
import "./SettingsPage.css";

const Privacy = () => {
  const [selectedOption, setSelectedOption] = useState("change-password");

  return (
    <div className="privacy-container">
      <h2 className="privacy-header">Privacy & Security</h2>
      <div className="privacy-box">
        <nav className="privacy-sidebar">
          <ul>
            <li className={selectedOption === "change-password" ? "active" : ""} onClick={() => setSelectedOption("change-password")}>
              Change Password
            </li>
            <li className={selectedOption === "two-factor" ? "active" : ""} onClick={() => setSelectedOption("two-factor")}>
              Two-Factor Authentication
            </li>
            <li className={selectedOption === "logged-in" ? "active" : ""} onClick={() => setSelectedOption("logged-in")}>
              Where You’re Logged In
            </li>
            <li className={selectedOption === "login-alerts" ? "active" : ""} onClick={() => setSelectedOption("login-alerts")}>
              Login Alerts
            </li>
          </ul>
        </nav>
        <div className="privacy-content">
          {selectedOption === "change-password" && <h3>Change your password</h3>}
          {selectedOption === "two-factor" && <h3>Enable Two-Factor Authentication</h3>}
          {selectedOption === "logged-in" && <h3>Manage Active Sessions</h3>}
          {selectedOption === "login-alerts" && <h3>Configure Login Alerts</h3>}
        </div>
      </div>
    </div>
  );
};

export default Privacy;