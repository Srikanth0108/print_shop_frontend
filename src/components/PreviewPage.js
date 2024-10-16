import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import { storage } from "./firebaseConfig"; // Import Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios"; // For backend interaction
import "./PreviewPage.css"; // Include CSS for styling

const PreviewPage = () => {
  const location = useLocation(); // Get the state passed from OrderPage
  const navigate = useNavigate(); // Initialize useNavigate
  const [isProcessing, setIsProcessing] = useState(false); // State for processing payment

  // Destructure the order details from the location state
  const {
    username,
    shopName,
    copies,
    pageType,
    pagesToPrint,
    specificPages,
    orientation,
    binding,
    documents = [],
    comments,
    grayscale,
    frontPagePrint,
    frontAndBack,
    total,
  } = location.state?.state || {
    total: 0,
    documents: [],
  };

  const handlePayment = async () => {
    setIsProcessing(true); // Set processing state to true

    try {
      // Simulate a payment ID
      const paymentId = `pay_${Math.random().toString(36).substr(2, 9)}`; // Generate a random payment ID

      // Upload documents to Firebase Storage and get the URLs
      const uploadedDocsUrls = await Promise.all(
        documents.map(async (doc) => {
          const storageRef = ref(storage, `documents/${doc.name}`);
          await uploadBytes(storageRef, doc);
          return await getDownloadURL(storageRef);
        })
      );

      // Prepare order data to send to the backend
      const orderData = {
        username,
        shopName,
        copies,
        pageType,
        pagesToPrint,
        specificPages,
        orientation,
        binding,
        documents: JSON.stringify(uploadedDocsUrls), // Firebase document URLs
        comments,
        grayscale,
        frontPagePrint,
        frontAndBack,
        total,
        payment_id: paymentId, // Simulated payment ID
      };

      // Send order details to your backend
await axios.post("http://localhost:5000/api/save-order", orderData);

      // Navigate to thank you page or confirmation page after successful "payment"
      navigate("/thank-you-page", { state: { paymentId, total,shopName } });
    } catch (error) {
      console.error("Error processing the payment:", error);
      setIsProcessing(false); // Reset processing state if there's an error
    }
  };

  return (
    <div className="preview-page-container">
      <header className="preview-header">
        <h1>Order Preview</h1>
      </header>

      <div className="preview-details">
        <h2>
          <span>Total Amount: {total} Rs</span>
        </h2>

        <h2>
          <span>Uploaded Documents:</span>
        </h2>
        <div className="document-list">
          {documents.map((doc, index) => (
            <div key={index} className="document-item">
              <img
                src={URL.createObjectURL(doc)} // Create a URL for the uploaded document
                alt={`Document ${index + 1}`}
                className="document-preview"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="preview-footer">
        <button
          className="payment-btn"
          onClick={handlePayment}
          disabled={isProcessing} // Disable button if processing payment
        >
          {isProcessing ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;
