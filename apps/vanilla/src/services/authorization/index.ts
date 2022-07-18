import { HttpError } from '@js-camp/core/models/httpError';
import { ErrorLogin, Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';
import { ErrorUser, User } from '@js-camp/core/models/user';
import { navigate } from '@js-camp/core/utils';

import { HOME_URL, KEY_TOKEN } from '../../constants';
import { login } from '../api/login';

import { registerNewUser } from '../api/register';
import { verifyToken } from '../api/verifyToken';
import { LocalStorageService } from '../localStore';

export namespace AuthorizationService {

  /**
   * Sign up user service.
   * @param user Information to register of user.
   */
  export async function signUp(user: User): Promise<void | ErrorUser> {
    const result = await registerNewUser(user);
    if (result instanceof HttpError) {
      const error = result.data;
      if (error == null) {
        return;
      }
      return error;
    }
    LocalStorageService.setValue<Token>(KEY_TOKEN, result);
    navigate(HOME_URL);
  }

  /**
   * Login (get token) service.
   * @param info Login information of user.
   */
  export async function getToken(info: Login): Promise<void | ErrorLogin | HttpError<Login>> {
    const result = await login(info);
    if (result instanceof HttpError) {
      const error = result.data;
      if (error == null) {
        return result;
      }
      return error;
    }
    LocalStorageService.setValue<Token>(KEY_TOKEN, result);
    navigate(HOME_URL);
  }

  /** Check if user is logged. */
  export async function isLoggedIn(): Promise<boolean> {
    const token = LocalStorageService.getValue<Token>(KEY_TOKEN);
    if (token == null) {
      return false;
    }
    const result = await verifyToken(token);
    if (result instanceof HttpError) {
      return false;
    }
    return true;
  }

  /** Log user out. */
  export function logOut(): void {
    LocalStorageService.remove(KEY_TOKEN);
  }
}
