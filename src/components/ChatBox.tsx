"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  onStartVideoCall: () => void;
  onMarkSolved: () => void;
  mentorName: string;
  isLoading?: boolean;
  isWalletConnected?: boolean;
  bountyAmount?: string;
}

// Helper function to format time consistently
const formatTime = (timestamp: Date): string => {
  // Ensure we're working with a proper Date object
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

  // Use a consistent format that works the same on server and client
  return date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", // Use UTC to avoid timezone differences
  });
};

// Client-side only time component to avoid hydration issues
const MessageTime = ({ timestamp }: { timestamp: Date }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="message-time">--:--:-- --</div>;
  }

  return (
    <div className="message-time">
      {timestamp.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>
  );
};

export function ChatBox({
  messages,
  onSendMessage,
  onStartVideoCall,
  onMarkSolved,
  mentorName,
  isLoading = false,
  isWalletConnected = false,
  bountyAmount = "15",
}: ChatBoxProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat with {mentorName}</h3>
        <div className="chat-actions">
          <button className="video-call-button" onClick={onStartVideoCall}>
            📹 Start Video Call
          </button>
          <button
            className="solve-button"
            onClick={onMarkSolved}
            disabled={isLoading}
          >
            {isLoading 
              ? "⏳ Processing..." 
              : isWalletConnected 
                ? `💰 Make Payment ($${bountyAmount})` 
                : "🔗 Connect Wallet"
            }
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => {
          const isSystemMessage = message.sender === "System";
          return (
            <motion.div
              key={message.id}
              className={`message ${
                isSystemMessage ? "system" : message.isOwn ? "own" : "other"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="message-content">{message.content}</div>
              <MessageTime timestamp={message.timestamp} />
            </motion.div>
          );
        })}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="message-input"
        />
        <button
          onClick={handleSend}
          className="send-button"
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
