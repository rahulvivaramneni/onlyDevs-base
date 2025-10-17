"use client";

import Link from "next/link";
import { Navigation } from "../components/Navigation";

export default function Home() {
  return (
    <div className="home-page">
      <Navigation />

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Debug live with real devs.
            <br />
            <span className="gradient-text">Pay only when solved.</span>
          </h1>

          <p className="hero-subtitle">
            Connect with experienced developers who can help you solve your
            coding challenges in real-time. Post a bounty, get help, and pay
            only when your problem is solved.
          </p>

          <div className="hero-actions">
            <Link href="/post">
              <button className="cta-button primary">Post a Gig</button>
            </Link>

            <Link href="/browse">
              <button className="cta-button secondary">Browse Gigs</button>
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-icons">
            <div className="icon">💻</div>
            <div className="icon">🔧</div>
            <div className="icon">⚡</div>
            <div className="icon">🚀</div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="features-title">How it works</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Post Your Problem</h3>
            <p>
              Describe your coding challenge and set a bounty amount. Default is
              $10 USDC.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Get Help</h3>
            <p>
              Experienced developers offer to help. Choose the best mentor for
              your needs.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Pay When Solved</h3>
            <p>
              Only pay when your problem is solved. Secure payments via Base
              blockchain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
