import { Token } from '@js-camp/core/models';

import { LocalStoreService } from './localStorageServce';

export namespace TokenService {

  const KEY_TOKEN = 'token';

  /** Get token form local storage. */
  export function get() {
    return LocalStoreService.getValue<Token>(KEY_TOKEN);
  }

  /**
   * Save to local storage.
   * @param token Current token.
   */
  export function save(token: Token) {
    return LocalStoreService.setValue<Token>(KEY_TOKEN, token);
  }

  /** Removes token. */
  export function remove() {
    return LocalStoreService.remove(KEY_TOKEN);
  }
}
