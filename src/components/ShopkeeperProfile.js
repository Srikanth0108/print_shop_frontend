import React, { useState } from "react";
import ShopkeeperProfileDropdown from "./ShopkeeperProfileDropdown"; // Import the shopkeeper's profile dropdown
import "./ShopkeeperProfile.css"; // Separate CSS for shopkeeper profile

const ShopkeeperProfile = () => {
  const [username, setUsername] = useState("Star SRM DTP"); // Default username
  const [shopDescription, setShopDescription] = useState(
    "Your one-stop shop for vibrant, flawless prints!"
  ); // Default shop description
  const [shopDetails, setShopDetails] = useState(
    "Shop no :240, Ground Floor, University Building, SRM Nagar, Kattangulathur"
  );
  const [isSaved, setIsSaved] = useState(false); // Track if the form is saved
  const [error, setError] = useState(""); // Track form errors
  const shopID = "shopkeeper123"; // Constant shopID

  // Handle input change for username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsSaved(false); // Set to unsaved on change
    setError(""); // Clear error on change
  };

  // Handle input change for shopDescription
  const handleShopDescriptionChange = (e) => {
    setShopDescription(e.target.value);
    setIsSaved(false); // Set to unsaved on change
    setError(""); // Clear error on change
  };

  // Handle input change for shopDetails
  const handleShopDetailsChange = (e) => {
    setShopDetails(e.target.value);
    setIsSaved(false); // Set to unsaved on change
    setError(""); // Clear error on change
  };

  // Validate form before saving
  const handleSave = () => {
    if (!username || !shopDescription || !shopDetails) {
      setError("All fields are required!"); // Set error if any field is empty
      return;
    }
    setError(""); // Clear error if validation passes
    setIsSaved(true); // Set to saved after validation
  };

  return (
    <div className="shopkeeper-profile-container">
      <header className="shopkeeper-header">
        <h1 className="shopkeeper-dashboard-title">Profile</h1>
        <ShopkeeperProfileDropdown className="shopkeeper-profile-dropdown" />
      </header>

      <div className="shopkeeper-profile-box">
        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}

        <form>
          <div className="form-group">
            <label htmlFor="shopID">Shop ID</label>
            <input
              type="text"
              id="shopID"
              value={shopID}
              readOnly
              className="profile-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="profile-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="shopDescription">Shop Description</label>
            <input
              type="text"
              id="shopDescription"
              value={shopDescription}
              onChange={handleShopDescriptionChange}
              className="profile-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="shopDetails">Shop Details</label>
            <textarea
              id="shopDetails"
              value={shopDetails}
              onChange={handleShopDetailsChange}
              className="profile-textarea"
            />
          </div>

          <button
            type="button"
            className={`save-button ${isSaved ? "saved" : ""}`}
            onClick={handleSave}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopkeeperProfile;
