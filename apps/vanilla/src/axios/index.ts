import axios, { AxiosInstance } from 'axios';

export const appAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Api-Key': import.meta.env.VITE_APP_API_KEY,
  },
});
