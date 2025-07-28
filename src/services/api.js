import axios from 'axios';

const api = axios.create({
  baseURL: 'https://projeto-zeine-api.onrender.com/api',
  timeout: 10000,
});

export default api;
