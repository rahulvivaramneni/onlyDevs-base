"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "../components/Navigation";
import { GigCard } from "../components/GigCard";
import { useGigs } from "../context/GigContext";

export default function BrowseGigs() {
  const router = useRouter();
  const { gigs, isLoading } = useGigs();
  const [filter, setFilter] = useState<"all" | "open" | "in-progress">("all");

  const filteredGigs = gigs.filter(
    (gig) => filter === "all" || gig.status === filter
  );

  const handleGigClick = (gigId: string) => {
    router.push(`/gig/${gigId}`);
  };

  return (
    <div className="browse-gigs-page">
      <Navigation />

      <motion.div
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="page-header">
          <h1>Browse Gigs</h1>
          <p>Find coding challenges you can help solve and earn bounties.</p>
        </div>

        <div className="filter-tabs">
          {[
            { key: "all", label: "All Gigs" },
            { key: "open", label: "Open" },
            { key: "in-progress", label: "In Progress" },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              className={`filter-tab ${filter === tab.key ? "active" : ""}`}
              onClick={() => setFilter(tab.key as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          className="gigs-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isLoading ? (
            <motion.div
              className="loading-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="loading-spinner"></div>
              <p>Loading gigs...</p>
            </motion.div>
          ) : filteredGigs.length > 0 ? (
            filteredGigs.map((gig, index) => (
              <motion.div
                key={gig.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GigCard gig={gig} onClick={() => handleGigClick(gig.id)} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="empty-icon">🔍</div>
              <h3>No gigs found</h3>
              <p>
                No gigs match your current filter. Try selecting a different
                filter or check back later.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
