import { AxiosRequestConfig } from 'axios';

import { TokenService } from '../services/tokenService';

/**
 * Add token to header.
 * @param config Axios config.
 */
export async function addToken(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {

  const token = await TokenService.get();

  if (token == null) {
    return config;
  }
  const { headers } = config;
  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token.access}`,
    },
  };
}
