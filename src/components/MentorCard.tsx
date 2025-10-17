"use client";

import { motion } from "framer-motion";

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  message: string;
  specialties: string[];
  baseReputation: number;
  completedGigs: number;
  baseName?: string; // Base name for the mentor
}

interface MentorCardProps {
  mentor: Mentor;
  onApprove: () => void;
}

export function MentorCard({ mentor, onApprove }: MentorCardProps) {
  return (
    <motion.div
      className="mentor-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="mentor-header">
        <div className="mentor-avatar">
          <img src={mentor.avatar} alt={mentor.name} />
        </div>
        <div className="mentor-info">
          <h4 className="mentor-name">{mentor.name}</h4>
          {mentor.baseName && (
            <div className="base-name">
              <span className="base-name-label">Base:</span>
              <span className="base-name-value">{mentor.baseName}</span>
            </div>
          )}
          <div className="mentor-stats">
            <div className="mentor-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < mentor.rating ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">({mentor.rating}/5)</span>
            </div>
            <div className="base-reputation">
              <span className="reputation-label">Base Rep:</span>
              <span className="reputation-score">{mentor.baseReputation}</span>
            </div>
            <div className="completed-gigs">
              <span className="gigs-label">Completed:</span>
              <span className="gigs-count">{mentor.completedGigs}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mentor-message">"{mentor.message}"</p>

      <div className="mentor-specialties">
        {mentor.specialties.map((specialty, index) => (
          <span key={index} className="specialty-tag">
            {specialty}
          </span>
        ))}
      </div>

      <button className="approve-button" onClick={onApprove}>
        Approve Mentor
      </button>
    </motion.div>
  );
}
