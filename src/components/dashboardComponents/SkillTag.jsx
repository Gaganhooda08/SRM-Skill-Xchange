import React from "react";
import "./SkillTag.css"; // Ensure to create this CSS file for styling

const SkillTag = ({ skill }) => {
  return <span className="skill-tag">{skill}</span>;
};

export default SkillTag;
