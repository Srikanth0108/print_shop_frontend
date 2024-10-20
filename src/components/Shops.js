import React, { useState, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown"; // Import ProfileDropdown
import {useNavigate } from "react-router-dom"; // Import Link for navigation
import "./Shops.css"; // Shops specific styling
const Shops = () => {
  const [shopData, setShopData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Get location object

  const navigate = useNavigate();
  // Fetch shop data from backend
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/shops"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShopData(data); // Assuming data is an array of shop objects
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    };

    fetchShopData();
  }, []);

  // Filter shops based on search term
  const filteredShops = shopData.filter((shop) =>
    shop.username.toLowerCase().includes(searchTerm.toLowerCase()) // Adjust based on your data structure
  );
  const handleOrderButtonClick = async (shop) => {
    try {
      const response = await fetch(`http://localhost:5000/api/shop/${shop.username}/activity`);
      const data = await response.json();

      if (response.ok) {
        if (data.active) {
          // Proceed to the order page if the shop is active
          navigate(`/order/${shop.username}`);
        } else {
          alert("The shop is closed. Please try again later.");
        }
      } else {
        alert(data.message); // Handle any error messages from the server
      }
    } catch (error) {
      console.error("Error checking activity status:", error);
      alert("An error occurred while checking the shop's status.");
    }
  };

  return (
    <div className="shops-container">
      <header className="header">
        <h1 className="shops-title">Shops</h1>
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
      <div className="shop-cards">
        {filteredShops.length > 0 ? (
          filteredShops.map((shop, index) => (
            <div key={index} className="shop-card">
              <h3>{shop.username}</h3> {/* Adjusted from shop.name */}
              <p>{shop.shop_description}</p>{" "}
              {/* Adjusted from shop.description */}
              <p>{shop.shop_details}</p> {/* Adjusted from shop.details */}
              <span>
               <button className="order-btn" onClick={() => handleOrderButtonClick(shop)}>Order</button>
              </span>
            </div>
          ))
        ) : (
          <p className="no-results">No shops found.</p>
        )}
      </div>
    </div>
  );
};

export default Shops;
