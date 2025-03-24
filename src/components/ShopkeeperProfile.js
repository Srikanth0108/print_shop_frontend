import React, { useState, useEffect, useContext } from "react";
import ShopkeeperProfileDropdown from "./ShopkeeperProfileDropdown"; // Import the shopkeeper's profile dropdown
import "./ShopkeeperProfile.css"; // Separate CSS for shopkeeper profile
import { AuthContext } from "./context/AuthContext"; // Import AuthContext

const baseURL = process.env.REACT_APP_BACKEND_URL;

const ShopkeeperProfile = () => {
  const { auth } = useContext(AuthContext);
  const [shopDescription, setShopDescription] = useState("");
  const [shopDetails, setShopDetails] = useState("");
  const [grayscaleA1, setGrayscaleA1] = useState("");
  const [grayscaleA2, setGrayscaleA2] = useState("");
  const [grayscaleA3, setGrayscaleA3] = useState("");
  const [grayscaleA4, setGrayscaleA4] = useState("");
  const [grayscaleA5, setGrayscaleA5] = useState("");
  const [grayscaleA6, setGrayscaleA6] = useState("");
  const [colorA1, setColorA1] = useState("");
  const [colorA2, setColorA2] = useState("");
  const [colorA3, setColorA3] = useState("");
  const [colorA4, setColorA4] = useState("");
  const [colorA5, setColorA5] = useState("");
  const [colorA6, setColorA6] = useState("");
  const [bindingCost, setBindingCost] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const username = auth.user?.username || "";

  useEffect(() => {
    const fetchShopkeeperProfile = async () => {
      try {
        const response = await fetch(
          `${baseURL}/api/shopkeeper/profile?username=${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch shopkeeper profile");
        }
        const data = await response.json();
        setShopDescription(data.shop_description || "");
        setShopDetails(data.shop_details || "");
        setGrayscaleA1(data.grayscale_a1 || "");
        setGrayscaleA2(data.grayscale_a2 || "");
        setGrayscaleA3(data.grayscale_a3 || "");
        setGrayscaleA4(data.grayscale_a4 || "");
        setGrayscaleA5(data.grayscale_a5 || "");
        setGrayscaleA6(data.grayscale_a6 || "");
        setColorA1(data.color_a1 || "");
        setColorA2(data.color_a2 || "");
        setColorA3(data.color_a3 || "");
        setColorA4(data.color_a4 || "");
        setColorA5(data.color_a5 || "");
        setColorA6(data.color_a6 || "");
        setBindingCost(data.binding_cost || "");
      } catch (error) {
        console.error("Error fetching shopkeeper profile:", error);
      }
    };

    if (username) {
      fetchShopkeeperProfile();
    }
  }, [username]);

  const handleInputChange = (e, setter) => {
  const value = e.target.value;
  
  // For number inputs, ensure value is non-negative
  if (e.target.type === 'number') {
    // Allow empty string or valid non-negative number
    if (value === "" || parseFloat(value) >= 0.1) {
      setter(value);
      setIsSaved(false);
      setError("");
    }
  } else {
    // For text inputs, handle normally
    setter(value);
    setIsSaved(false);
    setError("");
  }
};

  const handleSave = async () => {
    if (
      !shopDescription ||
      !shopDetails ||
      !grayscaleA1 ||
      !grayscaleA2 ||
      !grayscaleA3 ||
      !grayscaleA4 ||
      !grayscaleA5 ||
      !grayscaleA6 ||
      !colorA1 ||
      !colorA2 ||
      !colorA3 ||
      !colorA4 ||
      !colorA5 ||
      !colorA6 ||
      !bindingCost
    ) {
      setError("All fields are required!");
      return;
    }
    setError("");

    const requestData = {
      username,
      shop_description: shopDescription,
      shop_details: shopDetails,
      grayscale_a1: grayscaleA1,
      grayscale_a2: grayscaleA2,
      grayscale_a3: grayscaleA3,
      grayscale_a4: grayscaleA4,
      grayscale_a5: grayscaleA5,
      grayscale_a6: grayscaleA6,
      color_a1: colorA1,
      color_a2: colorA2,
      color_a3: colorA3,
      color_a4: colorA4,
      color_a5: colorA5,
      color_a6: colorA6,
      binding_cost: bindingCost,
    };

    console.log("Sending data:", requestData);

    try {
      const response = await fetch(`${baseURL}/api/shopkeeper/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to update shopkeeper profile");
      }

      setIsSaved(true);
    } catch (error) {
      console.error("Error updating shopkeeper profile:", error);
      setError("Failed to save changes. Please try again.");
    }
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="shopkeeper-profile-container">
      <header className="shopkeeper-header">
        <h1 className="shopkeeper-dashboard-title">Profile</h1>
        <ShopkeeperProfileDropdown className="shopkeeper-profile-dropdown" />
      </header>

      <div className="shopkeeper-profile-box">
        {error && <p className="error-message">{error}</p>}

        {step === 1 && (
          <>
            <h2 className="step-heading">Basic Information</h2>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  readOnly
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="shopDescription">Shop Description</label>
                <input
                  type="text"
                  id="shopDescription"
                  value={shopDescription}
                  onChange={(e) => handleInputChange(e, setShopDescription)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="shopDetails">Shop Details</label>
                <textarea
                  id="shopDetails"
                  value={shopDetails}
                  onChange={(e) => handleInputChange(e, setShopDetails)}
                  className="profile-textarea"
                />
              </div>

              <button type="button" onClick={handleNext} className="next-btn">
                Next
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="step-heading">Black & white Printing Prices</h2>
            <form>
              <div className="form-group">
                <label htmlFor="Black & white A1">Black & white A1</label>
                <input
                  type="number"
                  id="grayscaleA1"
                  value={grayscaleA1}
                  onChange={(e) => handleInputChange(e, setGrayscaleA1)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Black & white A2">Black & white A2</label>
                <input
                  type="number"
                  id="grayscaleA2"
                  value={grayscaleA2}
                  onChange={(e) => handleInputChange(e, setGrayscaleA2)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Black & white A3">Black & white A3</label>
                <input
                  type="number"
                  id="grayscaleA3"
                  value={grayscaleA3}
                  onChange={(e) => handleInputChange(e, setGrayscaleA3)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Black & white A4">Black & white A4</label>
                <input
                  type="number"
                  id="grayscaleA4"
                  value={grayscaleA4}
                  onChange={(e) => handleInputChange(e, setGrayscaleA4)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Black & white A5">Black & white A5</label>
                <input
                  type="number"
                  id="grayscaleA5"
                  value={grayscaleA5}
                  onChange={(e) => handleInputChange(e, setGrayscaleA5)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Black & white A6">Black & white A6</label>
                <input
                  type="number"
                  id="grayscaleA6"
                  value={grayscaleA6}
                  onChange={(e) => handleInputChange(e, setGrayscaleA6)}
                  className="profile-input"
                />
              </div>

              <div className="button-group">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="next-btn"
                >
                  Previous
                </button>
                <button type="button" onClick={handleNext} className="next-btn">
                  Next
                </button>
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="step-heading">Color Printing Prices</h2>
            <form>
              <div className="form-group">
                <label htmlFor="Color A1">Color A1</label>
                <input
                  type="number"
                  id="colorA1"
                  value={colorA1}
                  onChange={(e) => handleInputChange(e, setColorA1)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Color A2">Color A2</label>
                <input
                  type="number"
                  id="colorA2"
                  value={colorA2}
                  onChange={(e) => handleInputChange(e, setColorA2)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Color A3">Color A3</label>
                <input
                  type="number"
                  id="colorA3"
                  value={colorA3}
                  onChange={(e) => handleInputChange(e, setColorA3)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Color A4">Color A4</label>
                <input
                  type="number"
                  id="colorA4"
                  value={colorA4}
                  onChange={(e) => handleInputChange(e, setColorA4)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Color A5">Color A5</label>
                <input
                  type="number"
                  id="colorA5"
                  value={colorA5}
                  onChange={(e) => handleInputChange(e, setColorA5)}
                  className="profile-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Color A6">Color A6</label>
                <input
                  type="number"
                  id="colorA6"
                  value={colorA6}
                  onChange={(e) => handleInputChange(e, setColorA6)}
                  className="profile-input"
                />
              </div>

              <div className="button-group">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="next-btn"
                >
                  Previous
                </button>
                <button type="button" onClick={handleNext} className="next-btn">
                  Next
                </button>
              </div>
            </form>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="step-heading">Additional Services</h2>
            <form>
              <div className="form-group">
                <label htmlFor="Binding Cost">Binding Cost</label>
                <input
                  type="number"
                  id="bindingCost"
                  value={bindingCost}
                  onChange={(e) => handleInputChange(e, setBindingCost)}
                  className="profile-input"
                />
              </div>

              <div className="button-group">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="next-btn"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="save-button"
                >
                  Save
                </button>
              </div>
            </form>
          </>
        )}

        {isSaved && (
          <p className="success-message">Profile updated successfully!</p>
        )}
      </div>
    </div>
  );
};

export default ShopkeeperProfile;