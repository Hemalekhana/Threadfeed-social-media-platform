import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./SettingsPage.css";

const data = [
  { day: "Sunday", hours: 3 },
  { day: "Monday", hours: 2 },
  { day: "Tuesday", hours: 4 },
  { day: "Wednesday", hours: 5 },
  { day: "Thursday", hours: 3 },
  { day: "Friday", hours: 6 },
  { day: "Saturday", hours: 4 },
];

const Time = () => {
  return (
    <div className="time-container">
      <h2 className="time-header">Time Spent</h2>

      <div className="time-box">
        <ResponsiveContainer width={800} height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Time;
