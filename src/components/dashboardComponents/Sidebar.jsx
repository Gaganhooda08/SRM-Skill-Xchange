import React from "react";
import "./Sidebar.css"; // Sidebar-specific CSS

const Sidebar = ({ setView }) => {
  return (
    <aside className="sidebar">
      <h2>SRM Skill Xchange</h2>
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
          <a href="#users" onClick={() => setView("users")}>
            All Users
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
