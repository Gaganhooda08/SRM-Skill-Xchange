import React, { useState } from "react";
import "./Auth.css"; // CSS for both Sign In and Sign Up
import { signupwithemailandpassword } from "../../firebase/auth";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission  
    try {
      await signupwithemailandpassword(email, password);
    } catch (error) {
      setError(error.message);  
    }
    }

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
