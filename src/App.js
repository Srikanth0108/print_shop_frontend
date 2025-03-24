// src/App.js
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./components/context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Import all your components
import LoginPage from "./components/LoginPage";
import StudentSignup from "./components/StudentSignup";
import ShopkeeperSignup from "./components/ShopkeeperSignup";
import ForgotPassword from "./components/ForgotPassword";
import Shops from "./components/Shops";
import OrderPage from "./components/OrderPage";
import PreviewPage from "./components/PreviewPage";
import OrderHistory from "./components/OrdersHistory";
import Dashboard from "./components/Dashboard";
import ShopkeeperProfile from "./components/ShopkeeperProfile";
import Insights from "./components/Insights";
import ResetPassword from "./components/ResetPassword";
import ThankYouPage from "./components/ThankYouPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Define your routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/shopkeeper-signup" element={<ShopkeeperSignup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route
              path="/shops"
              element={
                <PrivateRoute>
                  <Shops />
                </PrivateRoute>
              }
            />
            <Route
              path="/order/:shopName"
              element={
                <PrivateRoute>
                  <OrderPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/preview"
              element={
                <PrivateRoute>
                  <PreviewPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/thank-you-page"
              element={
                <PrivateRoute>
                  <ThankYouPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/insights"
              element={
                <PrivateRoute>
                  <Insights />
                </PrivateRoute>
              }
            />
            <Route
              path="/shopkeeper-profile"
              element={
                <PrivateRoute>
                  <ShopkeeperProfile />
                </PrivateRoute>
              }
            />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
