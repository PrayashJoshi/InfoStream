// src/components/ChatDisplay.tsx
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToChatGPT } from '../services/chatService';
import { useYouTubeData } from '../context/YoutubeDataContext';

const ChatDisplay: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showInfoStream, setShowInfoStream] = useState(true);
  const { isDataFetched, transcript } = useYouTubeData(); // Access YouTube data readiness
  const [isChatGPTReady, setIsChatGPTReady] = useState(true); // To track if ChatGPT is ready
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  useEffect(() => {
    setShowInfoStream(!isDataFetched); // Only show InfoStream when no YouTube data is ready
  }, [isDataFetched]);

  const handleSendMessage = async () => {
    if (!input.trim() || !isDataFetched || !isChatGPTReady) return; // Prevent sending if not ready

    setMessages(prev => [...prev, { user: input, bot: '' }]);
    setInput('');
    setShowInfoStream(false);

    setIsBotTyping(true);
    setIsChatGPTReady(false); // Disable interaction while waiting for ChatGPT
    const botResponse = await sendMessageToChatGPT(input + transcript); // Pass transcript data if necessary
    let displayText = '';
    const typingInterval = setInterval(() => {
      if (displayText.length < botResponse.length) {
        displayText += botResponse[displayText.length];
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...lastMessage, bot: displayText }];
        });
      } else {
        clearInterval(typingInterval);
        setIsBotTyping(false);
        setIsChatGPTReady(true); // Enable interaction once ChatGPT responds
      }
    }, 50);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isDataFetched) {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-display-container flex flex-col h-full p-1 bg-black text-white">
      {showInfoStream && (
        <div className="infostream-placeholder flex-grow flex items-center justify-center text-4xl font-bold text-[#4d4c4c]">
          InfoStream
        </div>
      )}
      <div className="chat-messages flex-grow overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="message-pair">
            <div className="user-message text-left bg-[#333] p-2 rounded mt-2">{`User: ${message.user}`}</div>
            {message.bot && <div className="bot-message text-left p-2 rounded mt-2">{`🤖: ${message.bot}`}</div>}
          </div>
        ))}
        {isBotTyping && <div className="bot-typing-indicator text-[#777] mt-2">Bot is typing...</div>}
        <div ref={chatEndRef} />
      </div>

      {/* Combined UserInput styling */}
      <div className="user-input-container flex items-center p-1 mt-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="flex-grow p-2 pl-4 text-black bg-white placeholder-gray-400 rounded-l-full outline-none"
        />
        <button
          onClick={handleSendMessage}
          className={`send-button flex items-center justify-center p-2 transition-transform rounded-r-full ${
            isDataFetched ? 'bg-gray-500 hover:scale-105' : 'bg-gray-300 cursor-not-allowed'
          }`}
          aria-label="Send"
          disabled={!isDataFetched || !isChatGPTReady} // Disable button when not ready
        >
          <span role="img" aria-label="send" className="send-icon">
            ⤴
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatDisplay;
