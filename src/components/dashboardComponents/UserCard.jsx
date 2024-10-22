import React, { useState } from "react";
import "./UserCard.css"; // User card specific CSS
import SkillTag from "./SkillTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SocialLinks from "./SocialLinks"; // Import the SocialLinks component
import { Navigate, useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  // Ensure user.skills is an array
  const skills = Array.isArray(user.skills) ? user.skills : [];
  const [showSocialLinks, setShowSocialLinks] = useState(false); // State to toggle social links

  const toggleSocialLinks = () => {
    setShowSocialLinks((prev) => !prev);
  };

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>
        <strong>Reg:</strong> {user.registration}
      </p>
      <p>
        <strong>Branch:</strong> {user.branch}
      </p>
      <p>
        <strong>Section:</strong> {user.section}
      </p>
      <p>
        <strong>Year:</strong> {user.year}
      </p>
      <div className="skills">
        <strong>Skills:</strong>{" "}
        {skills.length > 0
          ? skills.map((skill, index) => <SkillTag key={index} skill={skill} />)
          : "Not specified"}
      </div>
      <div className="user-card-buttons">
        <button className="contact-btn" onClick={toggleSocialLinks}>
          <FontAwesomeIcon icon={faEnvelope} /> Contact
        </button>
        <a className="coffee-btn" href={user.socialLinks.coffeeLink} target="_blank">
          <FontAwesomeIcon icon={faCoffee} /> Buy me a coffee
        </a>
      </div>

      {/* Conditionally render the SocialLinks component */}
      {console.log(user)}
      {showSocialLinks && user && user.socialLinks && (
        <SocialLinks links={user.socialLinks} />
      )}
    </div>
  );
};

export default UserCard;
