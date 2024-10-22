import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const socialIcons = {
  instagram: faInstagram,
  linkedin: faLinkedin,
  discord: faDiscord,
  github: faGithub,
};

const SocialLinks = ({ links }) => {
  return (
    <div className="social-links">
      <h4>Connect with me:</h4>
      <ul>
        {Object.keys(links).map((key) => {
          const link = links[key];
          if (link) {
            return (
              <li key={key}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={socialIcons[key]} />{" "}
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default SocialLinks;
