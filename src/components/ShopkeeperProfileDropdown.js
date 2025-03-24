import React, { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./ShopkeeperProfileDropdown.css"; // New CSS file for Shopkeeper dropdown
import logoImage from "./ProfileIcon.png"; // Profile image/logo
import { AuthContext } from "./context/AuthContext";

const emailURL = process.env.REACT_APP_EMAIL_URL;

const ShopkeeperProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const { logout } = useContext(AuthContext);
  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    // Implement logout functionality here
    navigate("/"); // Navigate to the login page
  };

  const handleProfile = () => {
    navigate("/shopkeeper-profile"); // Navigate to the Shopkeeper Profile page
  };

  const handleDashboard = () => {
    navigate("/dashboard"); // Navigate to the Dashboard page
  };
  const handleInsights=() =>{
    navigate("/insights");
  }
  const handleEmail = () => {
    window.open(
      emailURL,
      "_blank"
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector(".shopkeeper-profile-dropdown");
      if (dropdown && !dropdown.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="shopkeeper-profile-dropdown">
      <div className="shopkeeper-profile-icon" onClick={handleDropdownToggle}>
        <img
          src={logoImage} // Replace with the actual path to your profile image/logo
          alt="Shopkeeper Profile"
          className="shopkeeper-profile-image"
        />
      </div>
      {isOpen && (
        <div className={`shopkeeper-dropdown-menu ${isOpen ? "show" : ""}`}>
          <button
            className="shopkeeper-dropdown-button"
            onClick={handleProfile}
          >
            Profile
          </button>
          <button
            className="shopkeeper-dropdown-button"
            onClick={handleDashboard}
          >
            Dashboard
          </button>
          <button
            className="shopkeeper-dropdown-button"
            onClick={handleInsights}
          >
            Insights
          </button>
          <button className="shopkeeper-dropdown-button" onClick={handleEmail}>
            Help
          </button>
          <button className="shopkeeper-dropdown-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopkeeperProfileDropdown;
