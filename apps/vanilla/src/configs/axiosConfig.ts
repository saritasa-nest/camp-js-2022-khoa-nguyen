import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { API_KEY, BASE_URL } from '../constants';

/**
 * Interceptor that adds the schema API key header to the request.
 * @param config Axios config.
 */
function schemaInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  const { headers } = config;

  if (headers === null) {
    throw new Error(
      'Axios did not pass any header. Please check your request.',
    );
  }

  return {
    ...config,
    headers: {
      ...headers,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'api-key': API_KEY,
    },
  };
}

export const appAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(schemaInterceptor);
