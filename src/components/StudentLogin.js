import React, { useState } from "react";

const StudentLogin = ({ navigate, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "student" && password === "student123") {
      onLogin(); // Call the onLogin function to update the logged-in state
      navigate("/shops"); // Navigate to Shops page
    } else {
      setError("Invalid credentials. Please try again.");
    }
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

        <div className="input-group">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="login-actions">
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="forgot-password">
            <button
              onClick={() => navigate("/forgot-password")}
              className="link-button"
            >
              Forgot Password?
            </button>
          </p>
        </div>

        <p className="signup-link">
          Don’t have an account?
          <button
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
