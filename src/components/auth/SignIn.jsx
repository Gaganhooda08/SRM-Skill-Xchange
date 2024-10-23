import React, { useState } from "react";
import "./Auth.css"; // CSS for both Sign In and Sign Up
import { Link, useNavigate } from "react-router-dom";
import { loginwithemailandpassword } from "../../firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();
    setError(""); // Reset error state before attempting sign-in
    try {
      const userCredential = await loginwithemailandpassword(email, password);
      console.log("User Credential: ", userCredential); // Check the userCredential
      if (!userCredential || !userCredential.user) {
        throw new Error("User credential is undefined");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in Error: ", error); // Log error details
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <h2>Sign In to SRM Skill Exchange</h2>
      <form onSubmit={handleSignIn}>
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
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="auth-btn">
          Sign In
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up here</Link>.
      </p>
    </div>
  );
};

export default SignIn;
