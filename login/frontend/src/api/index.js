import axios from 'axios';
import { getAuthSystem } from './generated';

const axiosInstance = axios.create({ baseURL: 'http://localhost:8000' });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = getAuthSystem(axiosInstance);