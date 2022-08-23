import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addToken } from './interceptors/addToken';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Api-Key': CONFIG.apiKey,
  },
});

http.interceptors.request.use(addToken);

// http.interceptors.response.use(config => config, refreshToken);
