import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BaseURL } from '../constants/BaseURL';
import { getToken } from '../utils/storage';

export const createApiClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BaseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  api.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401 Unauthorized
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If the error is 401 and we haven't already tried to refresh the token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Here you could add token refresh logic if needed
          // const newToken = await refreshToken();
          // await setToken(newToken);
          // originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear auth and redirect to login
          // This would be handled by your auth context
          console.error('Session expired. Please log in again.');
        }
      }
      
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApiClient();
