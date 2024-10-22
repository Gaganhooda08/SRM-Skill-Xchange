import React, { useState, useEffect } from "react";
import Sidebar from "./dashboardComponents/Sidebar";
import Overview from "./dashboardComponents/Overview";
import ProfileCard from "./dashboardComponents/ProfileCard";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import RegisteredUsersPage from "./dashboardComponents/RegisteredUsersPage"; // Registered Users Page
import "./Dashboard.css";

const StudentDashboard = () => {
  const [view, setView] = useState("users");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.log("No such user document!");
        }
      }
    };

    fetchUserProfile();
  }, []);

  const renderContent = () => {
    switch (view) {
      case "profile":
        return <ProfileCard userData={userData} uid={auth.currentUser.uid} />;
      case "users":
        return <RegisteredUsersPage />;
      case "overview":
      default:
        return <Overview userData={userData} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setView={setView} />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default StudentDashboard;
