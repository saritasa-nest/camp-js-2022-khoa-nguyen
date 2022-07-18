import { Token } from '@js-camp/core/models/token';
import axios from 'axios';

import { TOKEN_KEY } from '../constant';
import { LocalStorageService } from '../services/localStore';

export const appAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Api-Key': import.meta.env.VITE_APP_API_KEY,
  },
});

appAxios.interceptors.request.use(config => {
  const token = LocalStorageService.getValue<Token>(TOKEN_KEY);
  if (!token) {
    return config;
  }
  return {
    ...config,
      headers: {
      ...config.headers,
        Authorization: `Bearer ${token?.access}`,
    },
  };
}
, error => Promise.reject(error));
