import { TokenDto } from '@js-camp/core/dtos';
import { TokenMapper } from '@js-camp/core/mappers';
import { Token } from '@js-camp/core/models';
import { setIsAuthorized } from '@js-camp/react/store/auth/slice';

import { http } from '..';
import { store } from '../../store';

import { LocalStoreService } from './localStorageServce';

export namespace TokenService {

  const KEY_TOKEN = 'token';
  const REFRESH_URL = 'auth/token/refresh/';

  /** Get token form local storage. */
  export function get(): Promise<Token | null> {
    return LocalStoreService.getValue<Token>(KEY_TOKEN);
  }

  /**
   * Save to local storage.
   * @param token Current token.
   */
  export function save(token: Token): Promise<void> {
    return LocalStoreService.setValue<Token>(KEY_TOKEN, token);
  }

  /** Removes token. */
  export function remove(): Promise<void> {
    return LocalStoreService.remove(KEY_TOKEN);
  }

  /**
   * Verify token.
   */
  export async function isValid(): Promise<boolean> {
    try {
      const token = await TokenService.get();
      if (token == null) {
        return false;
      }
      return true;
    } catch (error: unknown) {
      return false;
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
      store.dispatch(setIsAuthorized(false));
      throw error;
    }
  }
}