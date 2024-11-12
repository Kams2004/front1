// axiosConfig.js
import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    const sessionId = localStorage.getItem('sessionId');
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

// Add a response interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the stored authentication data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('sessionId');
      // Redirect to login page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axios;
