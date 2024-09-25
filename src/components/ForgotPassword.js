import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);

    // Redirect to LoginPage after 3 seconds
    setTimeout(() => {
      navigate("/"); // Adjust the path based on your routing setup
    }, 2000);
  };

  return (
    <div className="login-form-container">
      <h2>Forgot Password</h2>
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
    </div>
  );
};

export default ForgotPassword;
