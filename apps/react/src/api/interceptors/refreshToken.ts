import { AxiosError } from 'axios';

import { TokenService } from '../services/tokenService';

/**
 * Refresh token.
 * @param error Error of request.
 */
export async function refreshToken(error: unknown): Promise<void> {
  const token = await TokenService.get();
  if (token == null || !(error instanceof AxiosError)) {
    throw error;
  }

  if (error.response == null) {
    throw new Error('There is no response.');
  }

  if (error.response.status === 401) {
    await TokenService.remove();
    const newToken = await TokenService.refreshToken(token);
    return TokenService.save(newToken);
  }

  throw error;
}
