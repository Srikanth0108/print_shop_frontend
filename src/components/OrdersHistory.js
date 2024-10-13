import React, { useContext, useState, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown"; // Import ProfileDropdown
import "./OrderHistory.css"; // Reuse styles from Shops.css
import { AuthContext } from "./context/AuthContext";

const OrderHistory = () => {
  const { auth } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = auth.user?.username || "";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Update the fetch URL to include the username
        const response = await fetch(
          `http://localhost:5000/api/orders/${username}`
        ); // API to fetch orders
        const data = await response.json();
        console.log("Fetched data:", data);
        setOrders(data); // Set the fetched orders data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (username) {
      // Only fetch orders if username exists
      fetchOrders();
    } else {
      setIsLoading(false); // No username, stop loading
    }
  }, [username]); // Run the effect when username changes
  useEffect(() => {
    console.log("Orders state after update:", orders);
  }, [orders]);
  const filterOrders = (orders) => {
    return orders.filter((order) =>
      Object.values(order).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredOrders = filterOrders(orders);


  return (
    <div className="order-history-container">
      {isLoading ? (
        <div>Loading...</div> // Add this to show a loading state
      ) : (
        <>
          <header className="header">
            <h1 className="order-history-title">Orders</h1>
            <div className="search-bar">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search by Shop Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <ProfileDropdown className="profile-dropdown" />
          </header>

          {/* Orders Table */}
          <table className="orders-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Shop Name</th>
                <th>Copies</th>
                <th>Document Url</th>
                <th>Total Amount</th>
                <th>Date</th>
                <th>Payment ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.shopname}</td>
                    <td>{order.copies}</td>
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
                    <td>{order.total} Rs</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>{order.payment_id}</td>
                    <td>{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
