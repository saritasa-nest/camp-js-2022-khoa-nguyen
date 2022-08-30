import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { headers, ...restConfig } = error.config;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Authorization, ...restHeader } = error.config.headers as (AxiosRequestHeaders & {Authorization: string;});
    return http({
      ...restConfig,
      headers: {
        ...restHeader,
        Authorization: `Bearer ${newToken.access}`,
      },
    });
  }

  return Promise.reject(error);
}
