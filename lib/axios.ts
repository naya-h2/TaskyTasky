import axios from 'axios';

const authauthInstance = axios.create({});

authauthInstance.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem('login');

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export default authauthInstance;
