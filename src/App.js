import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import StudentSignup from "./components/StudentSignup";
import ShopkeeperSignup from "./components/ShopkeeperSignup";
import ForgotPassword from "./components/ForgotPassword";
import Shops from "./components/Shops"; // Import Shops

import OrderPage from "./components/OrderPage";
import PreviewPage from "./components/PreviewPage";
import PaymentPage from "./components/PaymentPage";
import OrderHistory from "./components/OrdersHistory";
import Dashboard from "./components/Dashboard";
import ShopkeeperProfile from "./components/ShopkeeperProfile";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if logged in

  // A function to handle login (you can customize it based on your login logic)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Reset login status when navigating to LoginPage
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname === "/") {
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Only render the header with ProfileDropdown if logged in */}

        <Routes>
          {/* Pass handleLogin to LoginPage so login can be tracked */}
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/shopkeeper-signup" element={<ShopkeeperSignup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Shops and other post-login routes */}
          {isLoggedIn && <Route path="/shops" element={<Shops />} />}
          {isLoggedIn && (
            <Route path="/order/:shopName" element={<OrderPage />} />
          )}
          {isLoggedIn && <Route path="/preview" element={<PreviewPage />} />}
          {isLoggedIn && <Route path="/payment" element={<PaymentPage />} />}
          {isLoggedIn && (
            <Route path="/order-history" element={<OrderHistory />} />
          )}
          {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
          {isLoggedIn && <Route path="/shopkeeper-profile" element={<ShopkeeperProfile />} />}
          

          {/* Add payment route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
