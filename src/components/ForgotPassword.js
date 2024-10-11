// src/ForgotPassword.jsx
import React, { useState, useEffect } from "react";
import { forgotPassword } from "./authService"; // Import the forgotPassword service
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(""); // Initialize as an empty string
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("userType");
    if (type) {
      setUserType(type); // Set userType based on query parameter
    }
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      // Call the forgotPassword API
      const data = await forgotPassword({ email, userType });
      setMessage(data.message); // Display success message
      // Alert user and redirect to login page after a short delay
      alert("Reset Link Sent");
      setTimeout(() => {
        navigate("/"); // Redirect to login page
      }, 1000);
    } catch (err) {
      // Handle error response from API
      setMessage(err.message || "Password reset failed. Please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Forgot Password</h2>
      {message && <p className="success-message">{message}</p>}
      {!message && (
        <form onSubmit={handlePasswordReset}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-actions">
            <button type="submit" className="login-button">
              Reset Link
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
