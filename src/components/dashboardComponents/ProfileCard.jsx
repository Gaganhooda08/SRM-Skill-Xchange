import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Ensure Firestore instance is correctly imported
import "./ProfileCard.css";
import SkillTag from "./SkillTag";

const ProfileCard = ({ userData, uid }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState(
    Array.isArray(userData?.skills) ? userData.skills : []
  );
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [coffeeLink, setCoffeeLink] = useState(userData?.coffeeLink || "");
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    linkedin: "",
    discord: "",
    github: "",
  });

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const socialLinksRef = doc(db, "users", uid, "socialLinks", "links");
        const socialLinksDoc = await getDoc(socialLinksRef);
        if (socialLinksDoc.exists()) {
          console.log("Fetched social links:", socialLinksDoc.data());
          setSocialLinks(socialLinksDoc.data());
        } else {
          console.log("No social links found.");
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };
    fetchSocialLinks();
  }, [uid]);

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  const handleAddSkill = async () => {
    if (!newSkill) return;
    const userRef = doc(db, "users", uid);
    try {
      await updateDoc(userRef, { skills: arrayUnion(newSkill) });
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill("");
      setShowAddSkill(false);
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleSaveLinks = async () => {
    const socialLinksRef = doc(db, "users", uid, "socialLinks", "links");
    try {
      await setDoc(
        socialLinksRef,
        { coffeeLink, ...socialLinks },
        { merge: true }
      );
      console.log("Social links updated successfully!", {
        coffeeLink,
        ...socialLinks,
      });
    } catch (error) {
      console.error("Error updating social links:", error);
    }
  };

  const handleEditProfile = async () => {
    const userRef = doc(db, "users", uid);
    try {
      await updateDoc(userRef, editedData);
      console.log("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="profile-card">
      <h3>Profile Information</h3>
      {isEditing ? (
        <div className="profile-info-edit">
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="edit-input"
          />
          <input
            type="email"
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="edit-input"
          />
          <input
            type="text"
            name="registration"
            value={editedData.registration}
            onChange={handleInputChange}
            placeholder="Registration No."
            className="edit-input"
          />
          <input
            type="text"
            name="branch"
            value={editedData.branch}
            onChange={handleInputChange}
            placeholder="Branch"
            className="edit-input"
          />
          <input
            type="text"
            name="section"
            value={editedData.section}
            onChange={handleInputChange}
            placeholder="Section"
            className="edit-input"
          />
          <input
            type="text"
            name="year"
            value={editedData.year}
            onChange={handleInputChange}
            placeholder="Year"
            className="edit-input"
          />
          <button className="save-profile-btn" onClick={handleEditProfile}>
            Save Profile
          </button>
          <button
            className="cancel-edit-btn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
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
          <div>
            <strong>Skills:</strong>{" "}
            {skills.length > 0
              ? skills.map((skill, index) => (
                  <SkillTag key={index} skill={skill} />
                ))
              : "Not specified"}
          </div>
        </div>
      )}
      <button
        className="toggle-skill-btn"
        onClick={() => setShowAddSkill((prev) => !prev)}
      >
        {showAddSkill ? "Cancel" : "Add Skill"}
      </button>
      {showAddSkill && (
        <div className="add-skill-section">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill"
            className="add-skill-input"
          />
          <button className="add-skill-btn" onClick={handleAddSkill}>
            Add Skill
          </button>
        </div>
      )}
      <button
        className="toggle-links-btn"
        onClick={() => setShowLinks((prev) => !prev)}
      >
        {showLinks ? "Hide Contact Links" : "Add Contact Links"}
      </button>
      {showLinks && (
        <div className="links-section">
          <h4>Contact Links</h4>
          <div className="link-inputs">
            <input
              type="text"
              value={coffeeLink}
              onChange={(e) => setCoffeeLink(e.target.value)}
              placeholder="Buy Me a Coffee link"
              className="link-input"
            />
            <input
              type="text"
              value={socialLinks.instagram}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, instagram: e.target.value })
              }
              placeholder="Instagram Link"
              className="link-input"
            />
            <input
              type="text"
              value={socialLinks.linkedin}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, linkedin: e.target.value })
              }
              placeholder="LinkedIn Link"
              className="link-input"
            />
            <input
              type="text"
              value={socialLinks.discord}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, discord: e.target.value })
              }
              placeholder="Discord Link"
              className="link-input"
            />
            <input
              type="text"
              value={socialLinks.github}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, github: e.target.value })
              }
              placeholder="GitHub Link"
              className="link-input"
            />
          </div>
          <button className="save-links-btn" onClick={handleSaveLinks}>
            Save Links
          </button>
        </div>
      )}
      <button className="profile-btn" onClick={() => setIsEditing(true)}>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
