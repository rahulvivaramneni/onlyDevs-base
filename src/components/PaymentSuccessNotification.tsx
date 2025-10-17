"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PaymentSuccessNotificationProps {
  isVisible: boolean;
  transactionDetails: {
    transactionId: string;
    amount: string;
    recipient: string;
    timestamp: string;
  } | null;
  onClose: () => void;
}

export function PaymentSuccessNotification({
  isVisible,
  transactionDetails,
  onClose,
}: PaymentSuccessNotificationProps) {
  const [showRibbons, setShowRibbons] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Start ribbon animation after a short delay
      const timer = setTimeout(() => setShowRibbons(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowRibbons(false);
    }
  }, [isVisible]);

  // Auto close after 8 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !transactionDetails) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="payment-success-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Falling Ribbons Animation */}
        {showRibbons && (
          <div className="ribbons-container">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="ribbon"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
                initial={{ y: -100, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight + 100, 
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  ease: "easeIn",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}

        {/* Main Success Modal */}
        <motion.div
          className="payment-success-modal"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.6 
          }}
        >
          {/* Success Icon with Animation */}
          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 15,
              delay: 0.2 
            }}
          >
            <motion.div
              className="checkmark"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <svg viewBox="0 0 52 52" className="checkmark-svg">
                <motion.circle
                  cx="26"
                  cy="26"
                  r="20"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
                <motion.path
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            className="success-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="success-title">Payment Successful! 🎉</h2>
            <p className="success-subtitle">
              Your bounty has been sent to the mentor
            </p>
          </motion.div>

          {/* Transaction Details */}
          <motion.div
            className="transaction-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="detail-row">
              <span className="detail-label">Amount:</span>
              <span className="detail-value amount">${transactionDetails.amount} USDC</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Transaction ID:</span>
              <span className="detail-value transaction-id">
                {transactionDetails.transactionId.slice(0, 8)}...{transactionDetails.transactionId.slice(-8)}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Recipient:</span>
              <span className="detail-value recipient">
                {transactionDetails.recipient.slice(0, 6)}...{transactionDetails.recipient.slice(-4)}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Time:</span>
              <span className="detail-value timestamp">
                {new Date(transactionDetails.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="success-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <button
              className="close-button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="view-transaction-button"
              onClick={() => {
                // In a real app, this would open the transaction in a block explorer
                window.open(`https://sepolia.basescan.org/tx/${transactionDetails.transactionId}`, '_blank');
              }}
            >
              View on BaseScan
            </button>
          </motion.div>

          {/* Confetti Effect */}
          <div className="confetti-container">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
                }}
                initial={{ 
                  y: -10, 
                  x: 0, 
                  rotate: 0,
                  opacity: 1 
                }}
                animate={{ 
                  y: 200, 
                  x: (Math.random() - 0.5) * 100,
                  rotate: 360,
                  opacity: 0 
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
