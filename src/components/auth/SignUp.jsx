import React, { useState } from "react";
import "./Auth.css"; // CSS for both Sign In and Sign Up
import { signupwithemailandpassword } from "../../firebase/auth"; // Custom auth function
import { Link } from "react-router-dom";
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
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      // Sign up the user with email and password
      await signupwithemailandpassword(email, password);

      // Add user details to Firestore
      await addUser(auth.currentUser.uid, {
        name: name,
        email: email,
        registration: registration,
        section: section,
        branch: branch,
        year: year,
      });
    } catch (error) {
      setError(error.message);
    }
  };

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
      });
      console.log("User added successfully!");
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
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
