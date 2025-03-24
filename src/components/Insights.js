import React, { useState, useEffect, useContext } from "react";
import ShopkeeperProfileDropdown from "./ShopkeeperProfileDropdown";
import { AuthContext } from "./context/AuthContext";
import ChatbotShopkeeper from "./ChatbotShopkeeper"; // Import ChatbotStudent
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Insights.css";
const baseURL = process.env.REACT_APP_BACKEND_URL;
const flaskURL = process.env.REACT_APP_FLASK_URL;

const Insights = () => {
  const { auth } = useContext(AuthContext);
  const username = auth.user?.username || "";

  const [timeRange, setTimeRange] = useState("1d");
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalEarnings: 0,
    completedOrders: 0,
    pendingOrders: 0,
    failedOrders: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [predictedOrders, setPredictedOrders] = useState(null); // Added state for predicted orders

  const timeRanges = [
    { label: "1 Hour", value: "1h" },
    { label: "4 Hours", value: "4h" },
    { label: "8 Hours", value: "8h" },
    { label: "12 Hours", value: "12h" },
    { label: "1 Day", value: "1d" },
    { label: "1 Week", value: "1w" },
    { label: "1 Month", value: "1m" },
    { label: "1 Year", value: "1y" },
  ];

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!username) return;
      try {
        const response = await fetch(
          `${baseURL}/api/shopkeeper/insights/${username}?timeRange=${timeRange}`
        );
        const data = await response.json();

        setOrderStats(data.stats);
        setChartData(data.chartData);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [timeRange, username]);

  useEffect(() => {
    const fetchPredictedOrders = async () => {
      if (!username) return;
      setPredictedOrders(null);

      try {
        const response = await fetch(
          `${flaskURL}/predict_orders?shopname=${username}&timeRange=${timeRange}`
        );
        const data = await response.json();
        setPredictedOrders(data.predicted_orders);
      } catch (error) {
        console.error("Error fetching predicted orders:", error);
      }
    };

    fetchPredictedOrders();
  }, [username, timeRange]);
  return (
    <div className="insights-container">
      <div className="insights-header">
        <h1>Insights</h1>
        <ShopkeeperProfileDropdown />
      </div>

      <div className="time-range-selector">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-select"
        >
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{orderStats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p>₹{orderStats.totalEarnings}</p>
        </div>
        <div className="stat-card">
          <h3>Predicted Orders</h3>
          <p>{predictedOrders !== null ? predictedOrders : "Loading..."}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Orders</h3>
          <p>{orderStats.completedOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Processing Orders</h3>
          <p>{orderStats.pendingOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Failed Orders</h3>
          <p>{orderStats.failedOrders}</p>
        </div>
      </div>

      <div className="graph-container">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completedOrders" fill="#4caf50" name="Completed" />
              <Bar dataKey="failedOrders" fill="#f44336" name="Failed" />
              <Bar dataKey="pendingOrders" fill="#ff9800" name="Processing" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#8884d8" name="Orders" />
              <Bar dataKey="earnings" fill="#82ca9d" name="Earnings (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <ChatbotShopkeeper/>
    </div>
  );
};

export default Insights;
