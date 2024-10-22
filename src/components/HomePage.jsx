import React, { useState } from "react";
import "./HomePage.css";
import SignIn from "./auth/SignIn";
import StudentDashboard from "./StudentDashboard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [getStarted, setGetStarted] = useState(false);
  const [Dashboard, setDashboard] = useState(false);

  if (Dashboard) {
    return <StudentDashboard />;
  }
  if (getStarted) {
    return <SignIn />;
  }
  return (
    <div className="homepage">
      <header className="hero">
        <div className="hero-text">
          <h1>SRM Skill Xchange</h1>
          <p>Learn, Share, and Grow together with the SRM community!</p>
          <Link
            className="cta-btn"
            to="/signin"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>Find a Mentor</h2>
          <p>Connect with skilled mentors and enhance your abilities.</p>
        </div>
        <div className="feature-card">
          <h2>Share Your Skills</h2>
          <p>Offer your expertise to help others learn and grow.</p>
        </div>
        <div className="feature-card">
          <h2>Collaborate on Projects</h2>
          <p>
            Work together on real-world projects and develop teamwork skills.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 SRM Skill Exchange. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
