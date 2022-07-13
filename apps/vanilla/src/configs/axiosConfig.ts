import axios from 'axios';

import { API_KEY, BASE_URL } from '../constants';

export const appAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'api-key': API_KEY,
  },
});
