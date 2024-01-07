import axios from 'axios';

const authInstance = axios.create({});

authInstance.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem('login');

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export default authInstance;
