import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const ShopkeeperSignup = () => {
  const [shopId, setShopId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopDetails, setShopDetails] = useState("");
  const [shopDescription, setShopDescription] = useState(""); // New state for shop description
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!shopId || !username || !password || !confirmPassword || !shopDetails || !shopDescription) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if(shopId!=="shopkeeper123"){
      setError("Invalid shop id");
      return;
    }

    setError("");
    alert(`Shopkeeper Signed up successfully with Shop ID: ${shopId}. Redirecting to Login Page.`);
    setTimeout(() => {
      navigate("/"); // Adjust the path based on your routing setup
    }, 3000);
  };

  return (
    <div className="login-form-container">
      <h2>Shopkeeper Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <div className="input-group s1">
          <input
            type="text"
            placeholder="Shop ID"
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group s1">
          <input
            type="text"
            placeholder="Shop Description" // New input for shop description
            value={shopDescription}
            onChange={(e) => setShopDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-group s1">
          <textarea
            placeholder="Shop Details"
            value={shopDetails}
            onChange={(e) => setShopDetails(e.target.value)}
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
