import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentLogin from "./StudentLogin";
import ShopkeeperLogin from "./ShopkeeperLogin";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  // Accept onLogin prop
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

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
        <StudentLogin navigate={navigate} onLogin={onLogin} /> // Pass onLogin
      ) : (
        <ShopkeeperLogin navigate={navigate} onLogin={onLogin}/>
      )}
    </div>
  );
};

export default LoginPage;
