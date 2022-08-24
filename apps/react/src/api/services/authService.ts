import { TokenDto } from '@js-camp/core/dtos';
import { LoginMapper, TokenMapper, UserMapper } from '@js-camp/core/mappers';
import { Login, Token, User } from '@js-camp/core/models';

import { http } from '..';

import { TokenService } from './tokenService';

export namespace AuthService {
  const LOGIN_URL = 'auth/login/';

  const REGISTER_URL = 'auth/register/';
  const REFRESH_URL = 'auth/refresh/';

  /**
   * Login.
   * @param data Login data.
   */
  export async function login(data: Login): Promise<Token> {
    const dataDto = LoginMapper.toDto(data);
    const tokenDto = await http.post<TokenDto>(
      LOGIN_URL,
      dataDto,
    );
    const token = TokenMapper.fromDto(tokenDto.data);
    await TokenService.save(token);
    return token;
  }

  /**
   * Register.
   * @param data Register data.
   */
  export async function register(data: User): Promise<Token> {
    const dataDto = UserMapper.toDto(data);
    const tokenDto = await http.post<TokenDto>(
      REGISTER_URL,
      dataDto,
    );
    const token = TokenMapper.fromDto(tokenDto.data);
    await TokenService.save(token);
    return token;
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
