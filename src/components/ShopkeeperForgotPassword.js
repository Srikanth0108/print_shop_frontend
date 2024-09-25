import React, { useState } from "react";
import "./LoginPage.css";

const ShopkeeperForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reset password link sent to: ${email}`);
  };

  return (
    <div className="login-form-container">
      <h2>Shopkeeper Forgot Password</h2>
      <form onSubmit={handleSubmit}>
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
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopkeeperForgotPassword;
