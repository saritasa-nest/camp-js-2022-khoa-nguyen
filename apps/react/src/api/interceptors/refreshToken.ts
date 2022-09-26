import { AxiosError, AxiosResponse } from 'axios';

import { http } from '..';

import { TokenService } from '../services/tokenService';

let isAlreadyRefreshToken = false;
let isErrorRefresh = false;

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

  if (isErrorRefresh) {
    isErrorRefresh = false;
    await TokenService.remove();
    return Promise.reject(error);
  }

  if (error.response.status === 401) {
    isAlreadyRefreshToken = false;
    if (error.config.url?.includes('refresh')) {
      isErrorRefresh = true;
    }
    if (!isAlreadyRefreshToken) {
      isAlreadyRefreshToken = true;
      const newToken = await TokenService.refreshToken(token);
      await TokenService.save(newToken);
    }
    return http.request(error.config);
  }
  return Promise.reject(error);
}
