import React, { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Ensure Firestore instance is correctly imported
import "./Overview.css"; // Overview-specific CSS

const Overview = ({ userData }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        setTotalUsers(usersSnapshot.size);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetchSkillsCount = async () => {
      if (userData) {
        setSkillsCount(userData.skills.length);
      } else {
        console.log("User data or ID is missing"); // Debugging
      }
    };

    fetchUserCount();
    fetchSkillsCount();
  }, [userData]);

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
          <p className="stat-value">{skillsCount} Skills</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Projects Completed</h3>
          <p className="stat-value">2 Projects</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Registered Users</h3>
          <p className="stat-value">{totalUsers} Users</p>
        </div>
      </div>
      <div className="coming-soon">
        <h3 className="coming-soon-title">Community Posts</h3>
        <p className="coming-soon-message">Coming Soon!</p>
      </div>
    </section>
  );
};

export default Overview;
