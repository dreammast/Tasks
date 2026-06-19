import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to format errors consistently
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // If the server returns a structured error envelope
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    // Fallback error format
    return Promise.reject({
      success: false,
      message: error.message || 'Something went wrong. Please try again.'
    });
  }
);

export default api;
