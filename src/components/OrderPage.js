import React, { useState,useContext,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderPage.css";
import ProfileDropdown from "./ProfileDropdown";
import del from "./icons8-delete-20.png";
import { PDFDocument } from 'pdf-lib';
import { AuthContext } from "./context/AuthContext";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const OrderPage = () => {
  const { auth } = useContext(AuthContext);
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
  const [frontAndBack, setFrontAndBack] = useState(false);
  const [frontPagePrint, setFrontPagePrint] = useState(false);
  const [total, setTotal] = useState(0);
  const [buttonText, setButtonText] = useState("Calculate Total");
  const [inputsChanged, setInputsChanged] = useState(false);
  const [shopPrices, setShopPrices] = useState(null);
 // Get location object
  const username = auth.user?.username || "";
   console.log("Username in Shops:", username);
  
  useEffect(() => {
    const fetchShopPrices = async () => {
      try {
        const response = await fetch(
          `${baseURL}/api/shops/${shopName}/prices`
        );
        if (!response.ok) throw new Error("Failed to fetch shop prices");

        const result = await response.json();
        console.log("Fetched shop prices:", result); // Add this line

        if (result.success) {
          setShopPrices(result.data); // Store the 'data' part from API response
        } else {
          throw new Error(result.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching shop prices:", error);
        alert("Failed to load shop prices. Please try again later.");
      }
    };

    fetchShopPrices();
  }, [shopName]);

  const grayscalePagePrices = {
    A1: shopPrices?.a1_bw || 0, // Make sure these match your API response keys
    A2: shopPrices?.a2_bw || 0,
    A3: shopPrices?.a3_bw || 0,
    A4: shopPrices?.a4_bw || 0,
    A5: shopPrices?.a5_bw || 0,
    A6: shopPrices?.a6_bw || 0,
  };

  const colorPagePrices = {
    A1: shopPrices?.a1_color || 0, // Make sure these match your API response keys
    A2: shopPrices?.a2_color || 0,
    A3: shopPrices?.a3_color || 0,
    A4: shopPrices?.a4_color || 0,
    A5: shopPrices?.a5_color || 0,
    A6: shopPrices?.a6_color || 0,
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
    const file = event.target.files[0];

    // Basic validation for file type and size (limit to 5MB)
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert("File size should be less than 5MB.");
            return; // Exit the function if the file size is too large
        }

        if (!["application/pdf", "image/jpeg", "image/png","image/jpg"].includes(file.type)) {
            alert("Only PDF and image files are allowed.");
            return; // Exit the function if the file type is not allowed
        }

        // If validations pass, update the documents state
        const newDocuments = [...documents];
        newDocuments[index] = file;
        setDocuments(newDocuments);
        setInputsChanged(true);
        setButtonText("Calculate Total"); // Update button text on input change
    }
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

  const countPagesInDocument = async(doc) => {
    if (doc.type === 'application/pdf') {
    const arrayBuffer = await doc.arrayBuffer(); // Get the file as an ArrayBuffer
    const pdfDoc = await PDFDocument.load(arrayBuffer); // Load the PDF document
    return pdfDoc.getPageCount(); // Return the number of pages in the PDF
  } 
  // Check if the document is an image file
  else if (doc.type.startsWith('image/')) {
    return 1; // Count each image as a single page
  } else {
    throw new Error('Unsupported file type'); // Handle unsupported file types
  } // Placeholder logic for counting pages in a document
  };

  const calculateTotal = async () => {
  if (!shopPrices) {
    alert("Shop pricing information is not available. Please try again later.");
    return;
  }
  if (documents.some((doc) => doc === "")) {
    alert("Please upload all documents.");
    return;
  }

  let pageCost = grayscale
    ? grayscalePagePrices[pageType] || 0
    : colorPagePrices[pageType] || 0;

  console.log("Page Cost:", pageCost, "Page Type:", pageType);

  let totalCost = 0;

  // Use Promise.all to resolve the page counts for all documents
  const pageCounts = await Promise.all(
    documents.map(async (doc) => {
      let documentPageCount = 0;

      if (pagesToPrint === "all") {
        documentPageCount = await countPagesInDocument(doc); // Await the count for "all" pages
      } else if (pagesToPrint === "pages" && specificPages) {
        const ranges = specificPages.split(",").map((range) => {
          const [start, end] = range.split("-").map(Number);
          return end ? end - start + 1 : 1;
        });
        documentPageCount = ranges.reduce((sum, count) => sum + count, 0);
      }

      return documentPageCount;
    })
  );

  pageCounts.forEach((documentPageCount) => {
    let documentCost = documentPageCount * pageCost * copies;

    const bindingCost = binding === "blue" || binding === "white" ? (shopPrices?.binding_cost || 0) : 0;
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
        const formData = {
          username,
          shopName,
          copies,
          pageType,
          pagesToPrint,
          specificPages,
          orientation,
          binding,
          documents,
          comments,
          grayscale,
          frontPagePrint,
          frontAndBack,
          total,
        };
        navigate("/preview", { state: {state:formData } });
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
              Black and White (Uncheck for color)
            </label>
          </div>

          <div className="order-input-group front-and-back-checkbox">
            <label>
              <input
                type="checkbox"
                checked={frontAndBack}
                onChange={(e) => {
                  setFrontAndBack(e.target.checked);
                  setInputsChanged(true);
                  setButtonText("Calculate Total"); // Update button text on input change
                }}
              />
              Front and back
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
              Blue Front Sheet
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
                    accept=".pdf,.jpg,.png,.jpeg"
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
            <p className="note">(only .pdf,.png,.jpg,.jpeg)</p>
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
