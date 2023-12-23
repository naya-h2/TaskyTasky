import axios from 'axios';

const instance = axios.create({});

instance.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem('login');

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export default instance;
