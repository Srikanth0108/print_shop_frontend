import React, { useState } from "react";
import { shopkeeperSignup } from "./authService";
import { useNavigate } from "react-router-dom";
import "./ShopkeeperSignup.css";

const ShopkeeperSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shopId: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    shopDescription: "",
    shopDetails: "",
    grayscaleA1: "",
    grayscaleA2: "",
    grayscaleA3: "",
    grayscaleA4: "",
    grayscaleA5: "",
    grayscaleA6: "",
    colorA1: "",
    colorA2: "",
    colorA3: "",
    colorA4: "",
    colorA5: "",
    colorA6: "",
    bindingCost: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // For number inputs, prevent negative values
    if (type === "number" && value < 0.1) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        const { shopId, username, email, phone, password, confirmPassword } =
          formData;
        if (
          !shopId ||
          !email ||
          !phone ||
          !username ||
          !password ||
          !confirmPassword
        ) {
          setError("All fields are required");
          return false;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        if (shopId !== "shopkeeper123") {
          setError("Invalid shop id");
          return false;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
          setError("Please enter a valid 10-digit phone number.");
          return false;
        }
        break;
      case 2:
        if (!formData.shopDescription || !formData.shopDetails) {
          setError("All fields are required");
          return false;
        }
        break;
      case 3:
        const grayscaleFields = ["A1", "A2", "A3", "A4", "A5", "A6"].map(
          (size) => `grayscale${size}`
        );
        if (grayscaleFields.some((field) => !formData[field])) {
          setError("All grayscale prices are required");
          return false;
        }
        // Check for values less than 0.1 in grayscale prices
        if (
          grayscaleFields.some((field) => parseFloat(formData[field]) < 0.1)
        ) {
          setError("Prices must be at least 0.1");
          return false;
        }
        break;
      case 4:
        const colorFields = ["A1", "A2", "A3", "A4", "A5", "A6"].map(
          (size) => `color${size}`
        );
        if (colorFields.some((field) => !formData[field])) {
          setError("All color prices are required");
          return false;
        }
        // Check for values less than 0.1 in color prices
        if (colorFields.some((field) => parseFloat(formData[field]) < 0.1)) {
          setError("Prices must be at least 0.1");
          return false;
        }
        break;
      case 5:
        if (!formData.bindingCost) {
          setError("Binding cost is required");
          return false;
        }
        // Check for binding cost less than 0.1
        if (parseFloat(formData.bindingCost) < 0.1) {
          setError("Binding cost must be at least 0.1");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setError("");
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.bindingCost) {
      setError("Binding cost is required");
      return;
    }

    try {
      await shopkeeperSignup(formData);
      alert(
        `Shopkeeper Signed up successfully with Username: ${formData.username}. Redirecting to Login Page.`
      );
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="login-form-container p">
      <h2>Shopkeeper Sign Up </h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        {step === 1 && (
          <>
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
          </>
        )}

        {step === 2 && (
          <>
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
          </>
        )}

        {step === 3 && (
          <>
            <h3>Black & White Printing Prices (₹)</h3>
            {["A1", "A2", "A3", "A4", "A5", "A6"].map((size) => (
              <div key={`grayscale${size}`} className="input-group s1">
                <input
                  type="number"
                  step="0.1"
                  name={`grayscale${size}`}
                  placeholder={`Black & White ${size} Price`}
                  value={formData[`grayscale${size}`]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </>
        )}

        {step === 4 && (
          <>
            <h3>Color Printing Prices (₹)</h3>
            {["A1", "A2", "A3", "A4", "A5", "A6"].map((size) => (
              <div key={`color${size}`} className="input-group s1">
                <input
                  type="number"
                  step="0.1"
                  name={`color${size}`}
                  placeholder={`Color ${size} Price`}
                  value={formData[`color${size}`]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </>
        )}

        {step === 5 && (
          <>
            <h3>Binding Cost (₹)</h3>
            <div className="input-group s1">
              <input
                type="number"
                name="bindingCost"
                placeholder="Enter binding cost"
                value={formData.bindingCost}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="login-actions">
          {step > 1 && (
            <button type="button" className="login-button" onClick={handleBack}>
              Back
            </button>
          )}
          {step < 5 ? (
            <button type="button" className="login-button" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button type="submit" className="login-button">
              Sign Up
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ShopkeeperSignup;
