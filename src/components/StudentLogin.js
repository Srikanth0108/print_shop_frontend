// src/StudentLogin.jsx
import React, { useState } from "react";
import { studentLogin } from "./authService"; // Import the studentLogin service
import Hide from "./icons8-closed-eye-20.png";
import UnHide from "./icons8-eye-20.png";
import "./LoginPage.css";

const StudentLogin = ({ navigate, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await studentLogin({ username, password });
      onLogin(data.user); // Update the logged-in state with user data
      navigate("/shops"); // Navigate to Shops page
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form-container">
      <h2>Student Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <img src={UnHide} alt="Hide" />
            ) : (
              <img src={Hide} alt="Hide" />
            )}
          </span>
        </div>

        <div className="login-actions">
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="forgot-password">
            <button
              type="button"
              onClick={() => navigate("/forgot-password?userType=student")}
              className="link-button"
            >
              Forgot Password?
            </button>
          </p>
        </div>

        <p className="signup-link">
          Don’t have an account?
          <button
            type="button"
            onClick={() => navigate("/student-signup")}
            className="link-button"
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default StudentLogin;
