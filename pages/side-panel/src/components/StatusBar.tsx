// src/components/StatusBar.tsx
import React from 'react';
import '../SidePanel.css'; // Ensure you import the CSS file

const StatusBar: React.FC = () => {
  return (
    <div className="status-bar">
      <span className="status-bar-text">Status: Connected</span>
      <button className="status-bar-button">
        <span role="img" aria-label="settings" className="status-bar-icon">
          ⚙️
        </span>
      </button>
    </div>
  );
};

export default StatusBar;
