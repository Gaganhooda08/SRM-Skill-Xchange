import React from "react";
import "./Overview.css"; // Overview-specific CSS

const Overview = ({ userData }) => {
  return (
    <section id="overview" className="overview-container">
      <h2 className="overview-title">Dashboard Overview</h2>
      <p className="overview-intro">
        Welcome back, <span>{userData ? userData.name : ""}!</span> Here’s an
        overview of your progress and activity.
      </p>
      <div className="stats">
        <div className="stat-card">
          <h3 className="stat-title">Skills Learned</h3>
          <p className="stat-value">5 Skills</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Courses Enrolled</h3>
          <p className="stat-value">3 Active Courses</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Projects Completed</h3>
          <p className="stat-value">2 Projects</p>
        </div>
      </div>
    </section>
  );
};

export default Overview;
