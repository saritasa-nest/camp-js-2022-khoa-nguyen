import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { http } from '..';

import { TokenService } from '../services/tokenService';

/**
 * Refresh token.
 * @param error Error of request.
 */
export async function refreshToken(error: unknown): Promise<AxiosResponse> {
  const token = await TokenService.get();
  if (token == null || !(error instanceof AxiosError)) {
    return Promise.reject(error);
  }

  if (error.response == null) {
    return Promise.reject(error);
  }

  if (error.response.status === 401) {
    await TokenService.remove();
    const newToken = await TokenService.refreshToken(token);
    await TokenService.save(newToken);
    const config: AxiosRequestConfig = {
      ...error.config,
      headers: {
        ...error.config.headers,
        Authorization: `Bearer ${newToken.access}`,
      },
    };
    return http(config);
  }

  return Promise.reject(error);
}
