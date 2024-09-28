// src/components/UserInput.tsx
import React, { useState } from 'react';

const UserInput: React.FC = () => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      // Logic to handle sending the message
      setInput('');
    }
  };

  return (
    <div className="user-input-container flex items-center p-2 outline-white">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        className="flex-grow p-2 pl-4 text-black bg-white placeholder-gray-400 rounded-l-full outline-none"
      />
      <button
        onClick={handleSend}
        className="send-button flex items-center justify-center p-2 bg-gray-300 rounded-r-full hover:scale-105 transition-transform "
        aria-label="Send">
        <span role="img" aria-label="send" className="send-icon">
          ⤴
        </span>
      </button>
    </div>
  );
};

export default UserInput;
