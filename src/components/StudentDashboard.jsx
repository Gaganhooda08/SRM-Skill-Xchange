import React, { useState, useEffect } from "react";
import "./Dashboard.css"; // CSS for the dashboard
import { auth, db } from "../firebase/firebase"; // Firestore and Auth instance
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

const StudentDashboard = () => {
  const [view, setView] = useState("overview"); // State to switch views (Overview, Profile, etc.)
  const [userData, setUserData] = useState(null); // State to hold user data

  // Fetch user profile from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid); // Reference to the user document
        const userDocSnap = await getDoc(userDocRef); // Get the document snapshot

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data()); // Set the user data to state
        } else {
          console.log("No such user document!");
        }
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array to run the effect only on component mount

  const renderContent = () => {
    switch (view) {
      case "profile":
        return (
          <section id="profile">
            <h2>My Profile</h2>
            {userData ? (
              <div className="profile-card">
                <h3>Profile Information</h3>
                <div className="profile-info">
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Registration No.:</strong> {userData.registration}
                  </p>
                  <p>
                    <strong>Branch:</strong> {userData.branch}
                  </p>
                  <p>
                    <strong>Section:</strong> {userData.section}
                  </p>
                  <p>
                    <strong>Year:</strong> {userData.year}
                  </p>
                  <p>
                    <strong>Skills:</strong>{" "}
                    {userData.skills || "Not specified"}
                  </p>
                </div>
                <button className="profile-btn">Edit Profile</button>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </section>
        );
      case "overview":
      default:
        return (
          <section id="overview">
            <h2>Dashboard Overview</h2>
            <p>
              Welcome back! Here’s an overview of your progress and activity.
            </p>
            <div className="stats">
              <div className="stat-card">
                <h3>Skills Learned</h3>
                <p>5 Skills</p>
              </div>
              <div className="stat-card">
                <h3>Courses Enrolled</h3>
                <p>3 Active Courses</p>
              </div>
              <div className="stat-card">
                <h3>Projects Completed</h3>
                <p>2 Projects</p>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>SRM Skill Exchange</h2>
        <ul>
          <li>
            <a href="#overview" onClick={() => setView("overview")}>
              Overview
            </a>
          </li>
          <li>
            <a href="#profile" onClick={() => setView("profile")}>
              My Profile
            </a>
          </li>
          <li>
            <a href="#my-skills" onClick={() => setView("overview")}>
              My Skills
            </a>
          </li>
          <li>
            <a href="#courses" onClick={() => setView("overview")}>
              My Courses
            </a>
          </li>
          <li>
            <a href="#mentors" onClick={() => setView("overview")}>
              Mentors
            </a>
          </li>
          <li>
            <a href="#projects" onClick={() => setView("overview")}>
              Projects
            </a>
          </li>
          <li>
            <a href="#collaborations" onClick={() => setView("overview")}>
              Collaborations
            </a>
          </li>
        </ul>
      </aside>

      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default StudentDashboard;
