"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "../components/Navigation";
import { MentorCard, Mentor } from "../components/MentorCard";
import { Gig } from "../context/GigContext";

export default function GigDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [gig, setGig] = useState<Gig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  // Fetch gig directly from API
  useEffect(() => {
    const fetchGig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/gigs/${params.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Gig not found");
          } else {
            setError("Failed to load gig");
          }
          return;
        }

        const gigData = await response.json();
        // Convert createdAt string back to Date object
        const gigWithDate = {
          ...gigData,
          createdAt: new Date(gigData.createdAt),
        };
        setGig(gigWithDate);
      } catch (err) {
        console.error("Error fetching gig:", err);
        setError("Failed to load gig");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchGig();
    }
  }, [params.id]);

  const handleApproveMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    // Navigate to chat page
    router.push(`/chat/${gig?.id}/${mentor.id}`);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="gig-detail-page">
        <Navigation />
        <div className="page-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading gig...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !gig) {
    return (
      <div className="gig-detail-page">
        <Navigation />
        <div className="page-container">
          <div className="error-state">
            <h1>{error || "Gig not found"}</h1>
            <p>
              The gig you're looking for doesn't exist or couldn't be loaded.
            </p>
            <button onClick={() => router.push("/browse")} className="button">
              Back to Browse
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gig-detail-page">
      <Navigation />

      <motion.div
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="gig-detail-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="gig-header">
            <h1 className="gig-title">{gig.title}</h1>
            <div className="gig-bounty">${gig.bounty}</div>
          </div>

          <div className="gig-meta">
            <span className="gig-poster">Posted by {gig.author}</span>
            <span className="gig-date">
              {gig.createdAt.toLocaleDateString()}
            </span>
            <span className={`gig-status ${gig.status}`}>{gig.status}</span>
          </div>

          <div className="gig-tags">
            {gig.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="gig-description">
            <h3>Description</h3>
            <div className="description-content">
              {gig.description.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mentors-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Mentors Offering Help</h2>

          {gig.mentors.length > 0 ? (
            <div className="mentors-grid">
              {gig.mentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <MentorCard
                    mentor={mentor}
                    onApprove={() => handleApproveMentor(mentor)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="empty-mentors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="empty-icon">👥</div>
              <h3>No mentors yet</h3>
              <p>Be the first to offer help for this gig!</p>
              <button className="offer-help-button">Offer Help</button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
