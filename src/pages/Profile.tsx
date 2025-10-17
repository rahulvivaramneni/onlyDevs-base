"use client";

import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { useWallet } from "../hooks/useWallet";

export default function Profile() {
  const {
    connected,
    universalAddress,
    subAccountAddress,
    connectWallet,
    loading,
    usdcBalance,
    fetchUSDCBalance,
  } = useWallet();

  // Mock profile data
  const profileData = {
    name: "Alex Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    completedGigs: 12,
    earnedBounties: 180,
    rating: 4.9,
    specialties: ["React", "TypeScript", "Solidity", "Next.js"],
  };

  const recentActivity = [
    {
      type: "completed",
      gig: "React Hook useEffect issue",
      bounty: 15,
      date: "2 days ago",
    },
    {
      type: "earned",
      gig: "Solidity gas optimization",
      bounty: 25,
      date: "1 week ago",
    },
    {
      type: "completed",
      gig: "Next.js API debugging",
      bounty: 10,
      date: "2 weeks ago",
    },
  ];

  return (
    <div className="profile-page">
      <Navigation />

      <motion.div
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="profile-avatar">
            <img src={profileData.avatar} alt={profileData.name} />
          </div>

          <div className="profile-info">
            <h1>{profileData.name}</h1>
            <div className="profile-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < profileData.rating ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">({profileData.rating}/5)</span>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{profileData.completedGigs}</span>
                <span className="stat-label">Completed Gigs</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  ${profileData.earnedBounties}
                </span>
                <span className="stat-label">Earned Bounties</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="profile-content">
          <motion.div
            className="wallet-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Wallet Information</h2>

            {!connected ? (
              <div className="wallet-connect">
                <p>Connect your Base wallet to start earning bounties</p>
                <button
                  className="connect-button"
                  onClick={connectWallet}
                  disabled={loading}
                >
                  {loading ? "Connecting..." : "Connect Wallet"}
                </button>
              </div>
            ) : (
              <div className="wallet-info">
                <div className="wallet-balance">
                  <label>USDC Balance:</label>
                  <span className="balance-amount">${usdcBalance}</span>
                  <button
                    className="refresh-button"
                    onClick={fetchUSDCBalance}
                    disabled={loading}
                  >
                    🔄
                  </button>
                </div>
                <div className="wallet-address">
                  <label>Universal Account:</label>
                  <span className="address">{universalAddress}</span>
                </div>
                <div className="wallet-address">
                  <label>Sub Account:</label>
                  <span className="address">{subAccountAddress}</span>
                </div>
                <div className="wallet-status">
                  <span className="status-indicator connected"></span>
                  Wallet Connected
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            className="specialties-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2>Specialties</h2>
            <div className="specialties-grid">
              {profileData.specialties.map((specialty, index) => (
                <motion.span
                  key={specialty}
                  className="specialty-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  {specialty}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="activity-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="activity-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="activity-icon">
                    {activity.type === "completed" ? "✅" : "💰"}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">
                      {activity.type === "completed" ? "Completed" : "Earned"} $
                      {activity.bounty}
                    </div>
                    <div className="activity-gig">{activity.gig}</div>
                    <div className="activity-date">{activity.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
