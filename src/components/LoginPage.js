// src/LoginPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StudentLogin from "./StudentLogin";
import ShopkeeperLogin from "./ShopkeeperLogin";
import { AuthContext } from "./context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (userData) => {
    login(userData); // Update the authentication state
  };

  return (
    <div className="login-container">
      <div className="user-type-toggle">
        <button
          className={userType === "student" ? "active" : ""}
          onClick={() => setUserType("student")}
        >
          Student
        </button>
        <button
          className={userType === "shopkeeper" ? "active" : ""}
          onClick={() => setUserType("shopkeeper")}
        >
          Shopkeeper
        </button>
      </div>

      {userType === "student" ? (
        <StudentLogin navigate={navigate} onLogin={handleLogin} />
      ) : (
        <ShopkeeperLogin navigate={navigate} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default LoginPage;
