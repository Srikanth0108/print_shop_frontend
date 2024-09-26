import React, { useState } from "react";
import ProfileDropdown from "./ProfileDropdown"; // Import ProfileDropdown
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Shops.css"; // Shops specific styling

const Shops = () => {
  const shopData = [
    {
      name: "Star SRM DTP",
      description: "Your one-stop shop for vibrant, flawless prints!",
      details:
        "Shop no :240, Ground Floor, University Building, SRM Nagar, Kattangulathur.",
    },
    {
      name: "MM SRM DTP",
      description: "Precision printing for all your creative needs!",
      details:
        "Shop no :254, First Floor, University Building, SRM Nagar, Kattangulathur.",
    },
    {
      name: "Tech SRM DTP",
      description: "Cutting-edge technology for perfect prints every time!",
      details:
        "Shop no :01, First Floor, Tech Park, SRM Nagar, Kattangulathur.",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredShops = shopData.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h3>{shop.name}</h3>
              <p>{shop.description}</p>
              <p>{shop.details}</p>
              <span>
              <Link to={`/order/${shop.name}`}>
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
