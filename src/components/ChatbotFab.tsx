import { useState } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';

const ChatbotFab = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    setShowTooltip(false);
    // Future: Open chatbot modal here
    alert('🤖 AI Chatbot coming soon! Stay tuned.');
  };

  return (
    <button
      className="chatbot-fab"
      onClick={handleClick}
      aria-label="Open AI Chatbot"
      id="chatbot-button"
    >
      <div className="fab-pulse" />
      <FiMessageSquare />
      {showTooltip && (
        <div className="chatbot-tooltip">
          🤖 AI Assistant — Coming Soon!
        </div>
      )}
    </button>
  );
};

export default ChatbotFab;
