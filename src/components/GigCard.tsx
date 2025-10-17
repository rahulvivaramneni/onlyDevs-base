"use client";

import { motion } from "framer-motion";
import { Gig } from "../context/GigContext";

interface GigCardProps {
  gig: Gig;
  onClick: () => void;
}

export function GigCard({ gig, onClick }: GigCardProps) {
  return (
    <motion.div
      className="gig-card"
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: "0 8px 32px rgba(0, 82, 255, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="gig-header">
        <h3 className="gig-title">{gig.title}</h3>
        <div className="gig-bounty">${gig.bounty}</div>
      </div>

      <p className="gig-description">{gig.description}</p>

      <div className="gig-tags">
        {gig.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="gig-footer">
        <span className="gig-poster">Posted by {gig.author}</span>
        <span className="gig-status">{gig.status}</span>
      </div>
    </motion.div>
  );
}
