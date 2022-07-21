import { HttpError } from '@js-camp/core/models/httpError';
import { Token } from '@js-camp/core/models/token';
import axios from 'axios';

import { KEY_TOKEN } from '../constants';
import { refreshToken } from '../services/api/verifyToken';
import { LocalStorageService } from '../services/localStore';

export const appAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Api-Key': import.meta.env.VITE_APP_API_KEY,
  },
});

appAxios.interceptors.request.use(config => {
  const token = LocalStorageService.getValue<Token>(KEY_TOKEN);

  if (token == null) {
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

appAxios.interceptors.response.use(response => response, async error => {
  const token = LocalStorageService.getValue<Token>(KEY_TOKEN);
  if (token != null && error.response.status === 401) {
    const refreshedToken = await refreshToken(token);
    if (!(refreshedToken instanceof HttpError)) {
      LocalStorageService.setValue<Token>(KEY_TOKEN, refreshedToken);
      return;
    }
  }
  return Promise.reject(error);
});
