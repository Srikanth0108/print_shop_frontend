import React, { useState, useEffect, useContext } from "react";
import ShopkeeperProfileDropdown from "./ShopkeeperProfileDropdown"; // Import the shopkeeper's profile dropdown
import "./Dashboard.css"; // Separate CSS for shopkeeper dashboard
import { AuthContext } from "./context/AuthContext";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const ShopkeeperDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [failedOrders, setFailedOrders] = useState([]); 
   const [isActive, setIsActive] = useState(true);     // New state for Failed Orders
  const username = auth.user?.username || "";

  useEffect(() => {
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust loading time as needed
    return () => clearTimeout(timer);
  }, []);
   useEffect(() => {
  // Fetch initial activity status for the checkbox
  if (username) {
  const fetchActivityStatus = async () => {
    try {
      console.log("Username:", username);
      const response = await fetch(
        `${baseURL}/api/shopkeeper/${username}/activity`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch activity status");
      }

      const data = await response.json();
      setIsActive(data.active); // Corrected to use 'active' instead of 'activity'
    } catch (error) {
      console.error("Error fetching activity status:", error);
    }
  };

  fetchActivityStatus();
}
}, [username]);

const handleCheckboxChange = async (event) => {
  const newActivityStatus = event.target.checked;
  setIsActive(newActivityStatus); // Update local state

  // Update activity status in the backend
  try {
    const response = await fetch(
      `${baseURL}/api/shopkeeper/${username}/activity`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activity: newActivityStatus }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update activity status");
    }

    const result = await response.json();
    console.log("Activity status updated:", result);
  } catch (error) {
    console.error("Error updating activity status:", error);
    // Optionally, revert state if the update fails
    setIsActive(!newActivityStatus);
  }
};
  useEffect(() => {
    if (username) {
      // Define fetchOrders inside useEffect
      const fetchOrders = async () => {
        try {
          const response = await fetch(
            `${baseURL}/api/shopkeeper/orders/${username}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          const data = await response.json();

          // Filter orders based on status
          const processing = data.filter(
            (order) => order.status === "Processing"
          );
          const completed = data.filter(
            (order) => order.status === "Completed"
          );
          const failed = data.filter((order) => order.status === "Failed"); // Filter Failed Orders

          setProcessingOrders(processing);
          setCompletedOrders(completed);
          setFailedOrders(failed); // Set Failed Orders
        } catch (error) {
          console.error("Error fetching orders:", error);
          // Optionally, set an error state here to display to the user
        }
      };

      fetchOrders();
    }
  }, [username]); // No need to include fetchOrders in dependencies

  // Function to handle status change from Processing to Completed or Failed
  const handleStatusChange = async (payment_id, newStatus) => {
    try {
      const response = await fetch(
        `${baseURL}/api/shopkeeper/orders/${payment_id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const updatedOrder = await response.json();

      // Update the state to reflect the status change
      if (newStatus === "Completed") {
        setProcessingOrders((prevOrders) =>
          prevOrders.filter((order) => order.payment_id !== payment_id)
        );
        setCompletedOrders((prevOrders) => [updatedOrder.order, ...prevOrders]);
      } else if (newStatus === "Failed") {
        setProcessingOrders((prevOrders) =>
          prevOrders.filter((order) => order.payment_id !== payment_id)
        );
        setFailedOrders((prevOrders) => [updatedOrder.order, ...prevOrders]);
      }

      // Optionally, display a success message to the user
      alert(`Order status updated to ${newStatus}.`);
    } catch (error) {
      console.error("Error updating order status:", error);
      // Optionally, display an error message to the user
      alert("Failed to update order status.");
    }
  };

  // Function to filter orders based on search term
  const filterOrders = (orders) => {
    return orders.filter((order) =>
      Object.values(order).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="shopkeeper-dashboard-container">
      {!isLoading && (
        <>
          <header className="shopkeeper-header">
            <h1 className="shopkeeper-dashboard-title">Dashboard</h1>
            <div className="shopkeeper-search-bar">
              <div className="shopkeeper-search-input">
                <input
                  type="text"
                  placeholder="Search Orders"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <ShopkeeperProfileDropdown className="shopkeeper-profile-dropdown" />
          </header>

          <main className="shopkeeper-main-content">
            <label className={`checkbox-label ${isActive ? 'active' : 'inactive'}`}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={handleCheckboxChange}
                />
                Active
              </label>
            {/* Processing Orders Section */}
            <section className="orders-section">
              <h2>Processing Orders</h2>
              <div className="table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Black&White</th>
                      <th>Front&Back</th>
                      <th>Copies</th>
                      <th>Pagetype</th>
                      <th>Pagestoprint</th>
                      <th>SpecificPages</th>
                      <th>Orientation</th>
                      <th>Binding</th>
                      <th>FrontPagePrint</th>
                      <th>Documents</th>
                      <th>Comments</th>
                      <th>Total</th>
                      <th>Created At</th>
                      <th>Payment ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterOrders(processingOrders).length > 0 ? (
                      filterOrders(processingOrders).map((order) => (
                        <tr key={order.payment_id}>
                          <td>{order.username}</td>
                          <td>{order.grayscale}</td>
                          <td>{order.frontandback}</td>
                          <td>{order.copies}</td>
                          <td>{order.pagetype}</td>
                          <td>{order.pagestoprint}</td>
                          <td>{order.specificpages}</td>
                          <td>{order.orientation}</td>
                          <td>{order.binding}</td>
                          <td>{order.frontpageprint}</td>
                          <td>
                            {/* Check if documents is an array and map through it */}
                            {Array.isArray(order.documents) &&
                            order.documents.length > 0 ? (
                              order.documents.map((docUrl, docIndex) => (
                                <div key={docIndex}>
                                  <a
                                    href={docUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Document {docIndex + 1}
                                  </a>
                                </div>
                              ))
                            ) : (
                              <span>No documents available</span>
                            )}
                          </td>
                          <td>{order.comments}</td>
                          <td>{order.total}</td>
                          <td>{new Date(order.created_at).toLocaleString()}</td>
                          <td>{order.payment_id}</td>
                          <td>
                            {/* Dropdown for status update */}
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.payment_id,
                                  e.target.value
                                )
                              }
                            >
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                              <option value="Failed">Failed</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="16" style={{ textAlign: "center" }}>
                          No Processing Orders Found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Completed Orders Section */}
            <section className="orders-section">
              <h2>Completed Orders</h2>
              <div className="table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Black&White</th>
                      <th>Front&Back</th>
                      <th>Copies</th>
                      <th>Pagetype</th>
                      <th>Pagestoprint</th>
                      <th>SpecificPages</th>
                      <th>Orientation</th>
                      <th>Binding</th>
                      <th>FrontPagePrint</th>
                      <th>Documents</th>
                      <th>Comments</th>
                      <th>Total</th>
                      <th>Created At</th>
                      <th>Payment ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterOrders(completedOrders).length > 0 ? (
                      filterOrders(completedOrders).map((order) => (
                        <tr key={order.payment_id}>
                          <td>{order.username}</td>
                          <td>{order.grayscale}</td>
                          <td>{order.frontandback}</td>
                          <td>{order.copies}</td>
                          <td>{order.pagetype}</td>
                          <td>{order.pagestoprint}</td>
                          <td>{order.specificpages}</td>
                          <td>{order.orientation}</td>
                          <td>{order.binding}</td>
                          <td>{order.frontpageprint}</td>
                          <td>
                            {/* Check if documents is an array and map through it */}
                            {Array.isArray(order.documents) &&
                            order.documents.length > 0 ? (
                              order.documents.map((docUrl, docIndex) => (
                                <div key={docIndex}>
                                  <a
                                    href={docUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Document {docIndex + 1}
                                  </a>
                                </div>
                              ))
                            ) : (
                              <span>No documents available</span>
                            )}
                          </td>
                          <td>{order.comments}</td>
                          <td>{order.total}</td>
                          <td>{new Date(order.created_at).toLocaleString()}</td>
                          <td>{order.payment_id}</td>
                          <td className="status-completed">{order.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="16" style={{ textAlign: "center" }}>
                          No Completed Orders Found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Failed Orders Section */}
            <section className="orders-section">
              <h2>Failed Orders</h2>
              <div className="table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Black&White</th>
                      <th>Front&Back</th>
                      <th>Copies</th>
                      <th>Pagetype</th>
                      <th>Pagestoprint</th>
                      <th>SpecificPages</th>
                      <th>Orientation</th>
                      <th>Binding</th>
                      <th>FrontPagePrint</th>
                      <th>Documents</th>
                      <th>Comments</th>
                      <th>Total</th>
                      <th>Created At</th>
                      <th>Payment ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterOrders(failedOrders).length > 0 ? (
                      filterOrders(failedOrders).map((order) => (
                        <tr key={order.payment_id}>
                          <td>{order.username}</td>
                          <td>{order.grayscale}</td>
                          <td>{order.frontandback}</td>
                          <td>{order.copies}</td>
                          <td>{order.pagetype}</td>
                          <td>{order.pagestoprint}</td>
                          <td>{order.specificpages}</td>
                          <td>{order.orientation}</td>
                          <td>{order.binding}</td>
                          <td>{order.frontpageprint}</td>
                          <td>
                            {/* Check if documents is an array and map through it */}
                            {Array.isArray(order.documents) &&
                            order.documents.length > 0 ? (
                              order.documents.map((docUrl, docIndex) => (
                                <div key={docIndex}>
                                  <a
                                    href={docUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Document {docIndex + 1}
                                  </a>
                                </div>
                              ))
                            ) : (
                              <span>No documents available</span>
                            )}
                          </td>
                          <td>{order.comments}</td>
                          <td>{order.total}</td>
                          <td>{new Date(order.created_at).toLocaleString()}</td>
                          <td>{order.payment_id}</td>
                          <td className="status-failed">{order.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="16" style={{ textAlign: "center" }}>
                          No Failed Orders Found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </>
      )}
      {isLoading && (
        <div className="loading-indicator">
          <p>Loading Dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default ShopkeeperDashboard;
