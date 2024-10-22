import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faProjectDiagram,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <div className="hero-text">
          <h1 style={{ fontSize: "80px" }}>SRM Skill Xchange</h1>
          <p style={{ fontSize: "30px" }}>
            Learn, Share, and Grow together with the SRM community!
          </p>
          <Link style={{ fontSize: "20px"}} className="cta-btn" to="/signin">
            Get Started
          </Link>
        </div>
      </header>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-card">
          <FontAwesomeIcon icon={faUsers} size="3x" />
          <h3>Find a Mentor</h3>
          <p>Connect with skilled mentors and enhance your abilities.</p>
        </div>
        <div className="feature-card">
          <FontAwesomeIcon icon={faStar} size="3x" />
          <h3>Share Your Skills</h3>
          <p>Offer your expertise to help others learn and grow.</p>
        </div>
        <div className="feature-card">
          <FontAwesomeIcon icon={faProjectDiagram} size="3x" />
          <h3>Collaborate on Projects</h3>
          <p>
            Work together on real-world projects and develop teamwork skills.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 SRM Skill Exchange. All rights reserved.</p>
        <div className="social-links">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
