import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderPage.css";
import ProfileDropdown from "./ProfileDropdown";
import del from "./icons8-delete-20.png";

const OrderPage = () => {
  const { shopName } = useParams();
  const navigate = useNavigate();
  const [copies, setCopies] = useState(1);
  const [pageType, setPageType] = useState("A4");
  const [pagesToPrint, setPagesToPrint] = useState("all");
  const [specificPages, setSpecificPages] = useState("");
  const [orientation, setOrientation] = useState("auto");
  const [binding, setBinding] = useState("");
  const [documents, setDocuments] = useState([""]);
  const [comments, setComments] = useState("");
  const [grayscale, setGrayscale] = useState(true);
  const [frontPagePrint, setFrontPagePrint] = useState(false);
  const [total, setTotal] = useState(0);
  const [buttonText, setButtonText] = useState("Calculate Total");
  const [inputsChanged, setInputsChanged] = useState(false);

  const grayscalePagePrices = {
    A1: 80,
    A2: 50,
    A3: 10,
    A4: 1,
    A5: 0.5,
    A6: 0.3,
  };

  const colorPagePrices = {
    A1: 250,
    A2: 150,
    A3: 50,
    A4: 5,
    A5: 3,
    A6: 2,
  };

  const addUploadField = () => {
    if (documents.length < 10) {
      setDocuments([...documents, ""]);
      setButtonText("Calculate Total");
    }
  };
  const handleDeleteField = (index) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    setDocuments(newDocuments);
    setInputsChanged(true);
    setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
  };


  const handleFileChange = (index, event) => {
    const newDocuments = [...documents];
    newDocuments[index] = event.target.files[0];
    setDocuments(newDocuments);
    setInputsChanged(true);
    setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
  };

  const handlePageChange = (event) => {
    setPagesToPrint(event.target.value);
    if (event.target.value === "all") {
      setSpecificPages("");
    }
    setInputsChanged(true);
    setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
  };

  const handleBindingChange = (value) => {
    if (binding === value) {
      setBinding("");
    } else {
      setBinding(value);
    }
    setInputsChanged(true);
    setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
  };

  const countPagesInDocument = (doc) => {
    return 10; // Placeholder logic for counting pages in a document
  };

  const calculateTotal = () => {
    if (documents.some((doc) => doc === "")) {
      alert("Please upload all documents.");
      return;
    }

    let pageCost = grayscale
      ? grayscalePagePrices[pageType] || 0
      : colorPagePrices[pageType] || 0;

    let totalCost = 0;

    documents.forEach((doc) => {
      let documentPageCount = 0;

      if (pagesToPrint === "all") {
        documentPageCount = countPagesInDocument(doc);
      } else if (pagesToPrint === "pages" && specificPages) {
        const ranges = specificPages.split(",").map((range) => {
          const [start, end] = range.split("-").map(Number);
          return end ? end - start + 1 : 1;
        });
        documentPageCount = ranges.reduce((sum, count) => sum + count, 0);
      }

      let documentCost = documentPageCount * pageCost * copies;

      const bindingCost = binding === "blue" || binding === "white" ? 30 : 0;
      documentCost += bindingCost * copies;

      totalCost += documentCost;
    });

    setTotal(totalCost);
    setInputsChanged(false); // Reset inputs changed after calculating total
    setButtonText("Confirm Payment"); // Update the button text after calculating total
  };

  const handleButtonClick = () => {
    if (buttonText === "Calculate Total") {
      calculateTotal();
    } else if (buttonText === "Confirm Payment") {
      if (inputsChanged) {
        // If inputs have changed, recalculate total
        calculateTotal(); // Recalculate total
      } else {
        navigate("/preview", { state: { total, documents } });
      }
    }
  };

  return (
    <div className="order-page-container">
      <header className="order-header">
        <div className="order-title">Order</div>
        <div className="shop-name">{shopName}</div>
        <ProfileDropdown className="profile-dropdown" />
      </header>
      <div className="form-container">
        <div className="order-form">
          <div className="order-input-group">
            <label>Copies</label>
            <input
              type="number"
              min="1"
              max="100"
              value={copies}
              onChange={(e) => {
                setCopies(e.target.value);
                setInputsChanged(true);
                setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
              }}
              className="small-input"
            />
          </div>

          <div className="order-input-group grayscale-checkbox">
            <label>
              <input
                type="checkbox"
                checked={grayscale}
                onChange={(e) => {
                  setGrayscale(e.target.checked);
                  setInputsChanged(true);
                  setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
                }}
              />
              Print in Grayscale (Black and White)
            </label>
          </div>

          <div className="order-input-group">
            <label>Page Type</label>
            <select
              value={pageType}
              onChange={(e) => {
                setPageType(e.target.value);
                setInputsChanged(true);
                setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
              }}
              className="small-input"
            >
              {Object.keys(grayscalePagePrices).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className="order-input-group">
            <label>Pages to print</label>
            <div className="radio-group">
              <input
                type="radio"
                id="allPages"
                name="pages"
                value="all"
                checked={pagesToPrint === "all"}
                onChange={handlePageChange}
              />
              <label htmlFor="allPages">All</label>
              <input
                type="radio"
                id="specificPages"
                name="pages"
                value="pages"
                checked={pagesToPrint === "pages"}
                onChange={handlePageChange}
              />
              <label htmlFor="specificPages">Pages</label>
              <input
                type="text"
                placeholder="e.g. 2-8"
                value={specificPages}
                disabled={pagesToPrint === "all"}
                onChange={(e) => {
                  setSpecificPages(e.target.value);
                  setInputsChanged(true);
                  setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
                }}
                className="small-input"
              />
            </div>
          </div>

          <div className="order-input-group">
            <label>Orientation</label>
            <div className="radio-group">
              <input
                type="radio"
                name="orientation"
                value="auto"
                checked={orientation === "auto"}
                onChange={(e) => {
                  setOrientation(e.target.value);
                  setInputsChanged(true);
                  setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
                }}
              />{" "}
              Auto
              <input
                type="radio"
                name="orientation"
                value="portrait"
                checked={orientation === "portrait"}
                onChange={(e) => {
                  setOrientation(e.target.value);
                  setInputsChanged(true);
                  setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
                }}
              />{" "}
              Portrait
              <input
                type="radio"
                name="orientation"
                value="landscape"
                checked={orientation === "landscape"}
                onChange={(e) => {
                  setOrientation(e.target.value);
                  setInputsChanged(true);
                  setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
                }}
              />{" "}
              Landscape
            </div>
          </div>

          <div className="order-input-group">
            <label>Soft Binding</label>
            <div className="radio-group">
              <input
                type="radio"
                name="binding"
                value="blue"
                checked={binding === "blue"}
                onChange={() => {
                  handleBindingChange("blue");
                  setInputsChanged(true);
                  setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
                }}
              />{" "}
              Blue Binding
              <input
                type="radio"
                name="binding"
                value="white"
                checked={binding === "white"}
                onChange={() => {
                  handleBindingChange("white");
                  setInputsChanged(true);
                  setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
                }}
              />{" "}
              White Front Sheet
              <input
                type="checkbox"
                checked={frontPagePrint}
                onChange={(e) => {
                  if (binding === "blue" || binding === "white") {
                    setFrontPagePrint(e.target.checked);
                    setInputsChanged(true);
                    setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
                  }
                }}
                disabled={!(binding === "blue" || binding === "white")}
              />{" "}
              Front Page Print On Sheet
            </div>
          </div>

          <div className="order-input-group">
            <label>Upload Document</label>
            <div className="upload-section">
              {documents.map((doc, index) => (
                <div key={index} className="upload-field">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(index, e)}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  {index === documents.length - 1 && documents.length > 1 && (
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDeleteField(index)}
                    >
                      <img src={del} alt="del-btn" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-btn"
                onClick={addUploadField}
              >
                +
              </button>
            </div>
          </div>
          <div className="order-input-group">
            <p className="note">
              Note! For Multiple Documents Same Preference Will Be Applied.
            </p>
          </div>
          <div className="order-input-group">
            <label>Comments</label>
            <textarea
              placeholder="Add your comments here"
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
                setInputsChanged(true);
                setButtonText("Calculate Total"); // Set button text to "Calculate Total" on input change
              }}
            />
          </div>
          <div className="order-footer">
            <p>Total: {total} Rs</p>
            <button className="payment-btn" onClick={handleButtonClick}>
              {buttonText} {/* Update button text dynamically */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
