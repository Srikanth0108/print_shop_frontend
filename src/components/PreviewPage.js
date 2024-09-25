import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import "./PreviewPage.css"; // Include CSS for styling

const PreviewPage = () => {
  const location = useLocation(); // Get the state passed from OrderPage
  const navigate = useNavigate(); // Initialize useNavigate

  // Destructure the total and documents from the location state
  const { total, documents } = location.state || {
    total: 0,
    documents: [],
  };

  const handlePayment = () => {
    navigate("/payment"); // Navigate to the payment page
  };

  return (
    <div className="preview-page-container">
      <header className="preview-header">
        <h1>Order Preview</h1>
      </header>
      <div className="preview-details">
        <h2>Order Details</h2>
        <h3>Total Amount: {total} Rs</h3>
        <h2>Documents:</h2>
        <div className="document-list">
          {documents.map((doc, index) => (
            <div key={index} className="document-item">
              <p>Document {index + 1}:</p>
              <img
                src={URL.createObjectURL(doc)}
                alt={`Document ${index + 1}`}
                className="document-preview"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="preview-footer">
        <button className="payment-btn" onClick={handlePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;
