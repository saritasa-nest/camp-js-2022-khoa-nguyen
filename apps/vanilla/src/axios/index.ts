import axios from 'axios';

export const appAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: import.meta.env.VITE_APP_API_KEY,
});
