// src/authService.js
import API from './api';

// Student Signup
export const studentSignup = async (userData) => {
  try {
    const response = await API.post('/student/signup', userData);
    // Save token to localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Student Login
export const studentLogin = async (credentials) => {
  try {
    const response = await API.post('/student/login', credentials);
    // Save token to localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Shopkeeper Signup
export const shopkeeperSignup = async (userData) => {
  try {
    const response = await API.post('/shopkeeper/signup', userData);
    // Save token to localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Shopkeeper Login
export const shopkeeperLogin = async (credentials) => {
  try {
    const response = await API.post('/shopkeeper/login', credentials);
    // Save token to localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Forgot Password
export const forgotPassword = async (data) => {
  try {
    const response = await API.post('/forgot-password', data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Reset Password
export const resetPassword = async (data) => {
  try {
    const response = await API.post('/reset-password', data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
