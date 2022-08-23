import { TokenDto } from '@js-camp/core/dtos';
import { LoginMapper, TokenMapper } from '@js-camp/core/mappers';
import { HttpError, Login, Token } from '@js-camp/core/models';

import { http } from '..';

import { TokenService } from './tokenService';

export namespace AuthService {
  const LOGIN_URL = 'auth/login/';

  // const REGISTER_URL = 'auth/register/';
  const REFRESH_URL = 'auth/refresh/';

  /**
   * Login.
   * @param data Login data.
   */
  export async function login(data: Login): Promise<Token> {
    try {
      const dataDto = LoginMapper.toDto(data);
      const tokenDto = await http.post<TokenDto>(
        LOGIN_URL,
        dataDto,
      );
      const token = TokenMapper.fromDto(tokenDto.data);
      await TokenService.save(token);
      return token;
    } catch (error: unknown) {
      if (error instanceof HttpError<Login>) {
        const errorHttp = error as HttpError<Login>;
        throw errorHttp;
      }
      throw error;
    }
  }

  /**
   * Refreshes access token.
   * @param token Token object.
   */
  export async function refreshToken(token: Token): Promise<Token> {
    try {
      const result = await http.post<TokenDto>(REFRESH_URL, { refresh: token.refresh });
      return TokenMapper.fromDto(result.data);
    } catch (error: unknown) {
      await TokenService.remove();
      throw error;
    }
  }
}
