import React, { useState, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown"; // Import ProfileDropdown
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Shops.css"; // Shops specific styling

const Shops = () => {
  const [shopData, setShopData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
              <p>{shop.shop_description}</p> {/* Adjusted from shop.description */}
              <p>{shop.shop_details}</p> {/* Adjusted from shop.details */}
              <span>
                <Link to={`/order/${shop.username}`}>
                  <button className="order-btn">Order</button>
                </Link>
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
