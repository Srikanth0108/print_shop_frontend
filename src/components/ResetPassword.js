import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './ResetPassword.css';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log({ token, newPassword, confirmPassword });
    
    try {
      const response = await axios.post(`${baseURL}/api/auth/reset-password`, {
        token,
        newPassword,
        confirmPassword,
      });
      
      console.log(response.data); // Check the response from the backend

      // Check if the response contains a success message
      if (response.data.message) {
        alert("Password reset successful!");
        navigate("/");
      } else {
        setError("Password reset failed. Please try again.");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      // Check if the backend responded with a specific error message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display the specific error message from the backend
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
