import axios from 'axios';

import { API_KEY, BASE_URL } from '../constants';

export const appAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'api-key': API_KEY,
  },
});
