import React, { useState } from "react";

const ShopkeeperLogin = ({ navigate, onLogin }) => {
  // Accept onLogin prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "shopkeeper123" && password === "shop123") {
      onLogin(); // Call onLogin to update the logged-in state
      navigate("/dashboard"); // Navigate to Shops page
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Shopkeeper Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Shop ID"
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
            onClick={() => navigate("/shopkeeper-signup")}
            className="link-button"
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default ShopkeeperLogin;
