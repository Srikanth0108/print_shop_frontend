import React, { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./ProfileDropdown.css";
import logoImage from "./ProfileIcon.png";
import { AuthContext } from "./context/AuthContext";

const emailURL = process.env.REACT_APP_EMAIL_URL;

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Implement logout functionality here
    // For example, clear user session and navigate to login page
    logout();
    navigate("/"); // Navigate to the login page
  };

  const handleShops = () => {
    navigate("/shops"); // Navigate to the Shops page
  };

  const handleOrder = () => {
    navigate("/order-history"); // Navigate to the Orders page
  };
  const handleEmail = () => {
window.open(emailURL, "_blank");  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector(".profile-dropdown");
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
    <div className="profile-dropdown">
      <div className="profile-icon" onClick={handleDropdownToggle}>
        <img
          src={logoImage} // Replace with the actual path to your profile image
          alt="Profile"
          className="profile-image"
        />
      </div>
      {isOpen && (
        <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
          <button className="logout-button" onClick={handleShops}>
            Shops
          </button>
          <button className="logout-button" onClick={handleOrder}>
            Orders
          </button>
          <button className="logout-button" onClick={handleEmail}>
            Help
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
