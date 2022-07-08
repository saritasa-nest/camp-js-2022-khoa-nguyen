import axios, { AxiosInstance } from 'axios';

import { API_KEY, BASE_URL } from '../constants';

export const appAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'api-key': API_KEY,
  },
});
