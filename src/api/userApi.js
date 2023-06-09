import axios from 'axios';

export  const userApi = axios.create({
  baseURL: 'http://localhost:4000/api'
});

userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || '';
    config.headers['x-token'] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
