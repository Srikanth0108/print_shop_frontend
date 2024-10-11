// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Ensure this matches your backend URL
});

// Add a request interceptor to include the token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration or unauthorized access
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default API;
