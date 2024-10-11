// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
// To decode JWT tokens

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      try {
        const decoded = jwtDecode(auth.token);
        setAuth((prev) => ({ ...prev, user: decoded }));
      } catch (error) {
        console.error('Invalid token:', error);
        setAuth({ token: null, user: null });
        localStorage.removeItem('token');
      }
    }
  }, [auth.token]);

  const login = (userData) => {
    setAuth({
      token: localStorage.getItem('token'),
      user: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
