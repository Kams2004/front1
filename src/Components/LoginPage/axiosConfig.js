// axiosConfig.js
import axios from 'axios';

// Enable sending cookies with requests
axios.defaults.withCredentials = true;

// Add a request interceptor to include the token and session ID
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Get the access token from localStorage
    const sessionId = localStorage.getItem('sessionId'); // Get the session ID from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (sessionId) {
      config.headers['Session-ID'] = sessionId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
