import { Token } from '@js-camp/core/models/token';
import axios, { AxiosInstance } from 'axios';

export const appAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Api-Key': import.meta.env.VITE_APP_API_KEY,
  },
});

/**
 * @param token Token of user.
 */
export function authAxios(token: Token): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
      'Api-Key': import.meta.env.VITE_APP_API_KEY,
      'Authorization': `Bearer ${token.access}`,
    },
  });
}
