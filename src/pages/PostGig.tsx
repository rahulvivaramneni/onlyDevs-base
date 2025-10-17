"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "../components/Navigation";
import { useGigs } from "../context/GigContext";

export default function PostGig() {
  const router = useRouter();
  const { addGig } = useGigs();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    bounty: "0.0001",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add gig to API and get the ID
      const gigId = await addGig({
        title: formData.title,
        description: formData.description,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        bounty: formData.bounty,
        status: "open",
        author: "You", // In a real app, this would come from user auth
      });

      setLoading(false);

      // Navigate directly to the created gig
      router.push(`/gig/${gigId}`);
    } catch (error) {
      console.error("Error creating gig:", error);
      setLoading(false);
      // You could add error handling here, like showing a toast
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="post-gig-page">
      <Navigation />

      <motion.div
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="page-header">
          <h1>Post a Gig</h1>
          <p>
            Describe your coding challenge and set a bounty for developers to
            help you solve it.
          </p>
        </div>

        <motion.form
          className="gig-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Brief description of your problem"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Detailed description of your coding challenge, including error messages, code snippets, and what you've tried so far..."
              rows={6}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              placeholder="React, Solidity, JavaScript, etc. (comma-separated)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bounty">Bounty (USDC)</label>
            <div className="bounty-input">
              <span className="currency-symbol">$</span>
              <input
                id="bounty"
                type="number"
                value={formData.bounty}
                onChange={(e) => handleInputChange("bounty", e.target.value)}
                min="0.0001"
                step="0.0001"
                required
              />
            </div>
            <p className="bounty-note">
              Minimum bounty is $0.0001 USDC. You'll only pay when your problem
              is solved.
            </p>
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? "Posting..." : "Post Gig"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
