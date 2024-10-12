import React, { useState, useEffect, useContext } from "react";
import ShopkeeperProfileDropdown from "./ShopkeeperProfileDropdown"; // Import the shopkeeper's profile dropdown
import "./ShopkeeperProfile.css"; // Separate CSS for shopkeeper profile
import { AuthContext } from "./context/AuthContext"; // Import AuthContext

const ShopkeeperProfile = () => {
  const { auth } = useContext(AuthContext); // Access the auth context
  const [shopDescription, setShopDescription] = useState(""); // Shop description
  const [shopDetails, setShopDetails] = useState(""); // Shop details
  const [isSaved, setIsSaved] = useState(false); // Track if the form is saved
  const [error, setError] = useState(""); // Track form errors

  // Get the username from auth context
  const username = auth.user?.username || "";

  // Fetch shopkeeper's profile data on component mount
  useEffect(() => {
    const fetchShopkeeperProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/shopkeeper/profile?username=${username}`); // Fetch using username
        if (!response.ok) {
          throw new Error("Failed to fetch shopkeeper profile");
        }
        const data = await response.json();
        setShopDescription(data.shop_description);
        setShopDetails(data.shop_details);
      } catch (error) {
        console.error("Error fetching shopkeeper profile:", error);
      }
    };

    if (username) {
      fetchShopkeeperProfile();
    }
  }, [username]); // Dependency on username

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
  const handleSave = async () => {
    if (!shopDescription || !shopDetails) {
      setError("All fields are required!"); // Set error if any field is empty
      return;
    }
    setError(""); // Clear error if validation passes

    try {
      const response = await fetch(`http://localhost:5000/api/shopkeeper/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, // Include username in the body for updating
          shopDescription,
          shopDetails,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update shopkeeper profile");
      }

      setIsSaved(true); // Set to saved after validation
    } catch (error) {
      console.error("Error updating shopkeeper profile:", error);
      setError("Failed to save changes. Please try again.");
    }
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              readOnly // Make username input not editable
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
