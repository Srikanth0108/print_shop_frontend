import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ThankYouPage.css"; // Include CSS for styling

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { paymentId, total } = location.state || { paymentId: "", total: 0 };

  const handleGoHome = () => {
    navigate("/order-history"); // Navigate back to home page
  };

  return (
    <div className="thank-you-container">
      <header className="thank-you-header">
        <h1>Thank You!</h1>
      </header>

      <div className="thank-you-details">
        <h2>Your payment was successful!</h2>
        <h3>Payment ID: {paymentId}</h3>
        <h3>Total Amount: {total} Rs</h3>
        <p>Your order will be processed shortly. Thank you for choosing us!</p>
      </div>

      <div className="thank-you-footer">
        <button className="thank-you-btn" onClick={handleGoHome}>
          Orders
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
