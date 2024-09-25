import React, { useState, useEffect } from "react";
import ShopkeeperProfileDropdown from "./ShopkeeperProfileDropdown"; // Import the shopkeeper's profile dropdown
import "./Dashboard.css"; // Separate CSS for shopkeeper dashboard

const ShopkeeperDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust loading time as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="shopkeeper-dashboard-container">
      {!isLoading && (
        <header className="shopkeeper-header">
          <h1 className="shopkeeper-dashboard-title">Shopkeeper</h1>
          <div className="shopkeeper-search-bar">
            <div className="shopkeeper-search-input">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ShopkeeperProfileDropdown className="shopkeeper-profile-dropdown" />
        </header>
      )}
    </div>
  );
};

export default ShopkeeperDashboard;
