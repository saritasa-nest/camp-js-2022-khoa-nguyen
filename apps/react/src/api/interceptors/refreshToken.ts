import { AxiosError } from 'axios';

import { AuthService } from '../services/authService';

import { TokenService } from '../services/tokenService';

/**
 * Refresh token.
 * @param error Error of request.
 */
export async function refreshToken(error: unknown) {
  const token = await TokenService.get();

  if (token == null || !(error instanceof AxiosError)) {
    throw error;
  }

  if (error.response == null) {
    throw new Error('There is no response.');
  }

  if (error.response.status) {
    const newToken = await AuthService.refreshToken(token);
    return TokenService.save(newToken);
  }

  throw error;
}
