import axios from 'axios';

// Create a centralized axios instance for the application
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercept requests to inject auth tokens if they exist in Zustand store
api.interceptors.request.use((config) => {
  // In a real implementation, you'd pull this from useAppStore.getState().token
  const token = localStorage.getItem('urban_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Intercept responses for global error handling (e.g., 401s)
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    // Dispatch a global logout event or clear token
    localStorage.removeItem('urban_auth_token');
    window.dispatchEvent(new Event('auth-unauthorized'));
  }
  return Promise.reject(error);
});

export default api;
