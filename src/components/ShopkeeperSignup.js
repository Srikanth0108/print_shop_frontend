// src/ShopkeeperSignup.jsx
import React, { useState } from "react";
import { shopkeeperSignup } from "./authService"; // Import the shopkeeperSignup service
import { useNavigate } from "react-router-dom";
import "./ShopkeeperSignup.css";

const ShopkeeperSignup = () => {
  const [formData, setFormData] = useState({
    shopId: "",
    username: "",
    email:"",
    phone:"",
    password: "",
    confirmPassword: "",
    shopDescription: "",
    shopDetails: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { shopId, username,email,phone,password, confirmPassword, shopDescription, shopDetails } = formData;

    if (!shopId ||!email||!phone|| !username || !password || !confirmPassword || !shopDescription || !shopDetails) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Note: Validation for shopId on the backend, remove it here or adjust accordingly
    
    if (shopId !== "shopkeeper123") {
      setError("Invalid shop id");
      return;
    }
    const phoneRegex = /^\d{10}$/; // Validates a 10-digit phone number

    if (!phoneRegex.test(phone)) {
       setError("Please enter a valid 10-digit phone number.");
      return;
    }  
    

    try {
      await shopkeeperSignup({
        username,
        email, // Assuming email is derived from username; adjust as needed
        phone, // Placeholder phone; adjust accordingly
        password,
        confirmPassword,
        shopDescription,
        shopDetails,
      });
      alert(`Shopkeeper Signed up successfully with Username: ${username}. Redirecting to Login Page.`);
      setTimeout(() => {
        navigate("/"); // Redirect to login page
      }, 1000);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="login-form-container p">
      <h2>Shopkeeper Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <div className="input-group s1">
          <input
            type="text"
            name="shopId"
            placeholder="Shop ID"
            value={formData.shopId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="tel"
            name="phone"
            placeholder="Phone No"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="text"
            name="shopDescription"
            placeholder="Shop Description"
            value={formData.shopDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group s1">
          <textarea
            name="shopDetails"
            placeholder="Shop Details"
            value={formData.shopDetails}
            onChange={handleChange}
            className="shop-details-textarea"
            rows="4"
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

export default ShopkeeperSignup;
