// src/StudentSignup.js
import React, { useState } from "react";
import { studentSignup } from "./authService"; // Import the studentSignup service
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, email, phone, password, confirmPassword } = formData;

    if (!username || !email || !phone || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await studentSignup({ username, email, phone, password, confirmPassword });
      alert(`Student Signed up successfully with username: ${username}. Redirecting to Login Page.`);
      setTimeout(() => {
        navigate("/"); // Redirect to login page
      }, 1000);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Student Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-actions">
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentSignup;
