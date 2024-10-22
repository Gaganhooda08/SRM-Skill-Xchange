import React, { useState } from "react";
import "./Auth.css"; // CSS for both Sign In and Sign Up
import { signupwithemailandpassword } from "../../firebase/auth"; // Custom auth function
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate
import { auth, db } from "../../firebase/firebase"; // Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Firestore methods

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [section, setSection] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState(""); // State for skills
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Add a user to Firestore
  const addUser = async (userId, userData) => {
    try {
      await setDoc(doc(db, "users", userId), {
        name: userData.name,
        email: userData.email,
        registration: userData.registration,
        section: userData.section,
        branch: userData.branch,
        year: userData.year,
        skills: skills.split(",").map((skill) => skill.trim()), // Store skills as an array
      });
      console.log("User added successfully!");
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      // Sign up the user with email and password
      const userCredential = await signupwithemailandpassword(email, password);
      console.log(userCredential); // Log the userCredential

      // Check if userCredential is valid
      if (!userCredential || !userCredential.user) {
        throw new Error("User credential is undefined.");
      }

      const userId = userCredential.user.uid; // Get the user ID

      // Add user details to Firestore
      await addUser(userId, {
        name: name,
        email: email,
        registration: registration,
        section: section,
        branch: branch,
        year: year,
      });

      // Navigate to the dashboard page
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up for SRM Skill Exchange</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label>Registration no.</label>
          <input
            type="text"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            placeholder="Enter your registration no."
            required
          />
        </div>
        <div className="form-group">
          <label>Branch</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Enter your branch"
            required
          />
        </div>
        <div className="form-group">
          <label>Section</label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="Enter your section"
            required
          />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter your year"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />
        </div>
        <div className="form-group">
          <label>Skills (comma-separated)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter your skills (e.g., JavaScript, React)"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="auth-btn">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In here</Link>.
      </p>
    </div>
  );
};

export default SignUp;
