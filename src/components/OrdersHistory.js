import React, { useState, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown"; // Import ProfileDropdown
import "./OrderHistory.css"; // Reuse styles from Shops.css

const OrderHistory = () => {
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
    <div className="order-history-container">
      {!isLoading && (
        <header className="header">
          <h1 className="order-history-title">Orders</h1>
          <div className="search-bar">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ProfileDropdown className="profile-dropdown" />
        </header>
      )}
    </div>
  );
};

export default OrderHistory;
