import { HttpError } from '@js-camp/core/models/httpError';
import { Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';
import { navigate } from '@js-camp/core/utils';

import { PROFILE_URL, KEY_TOKEN } from '../constants';

import { login } from '../service/api/login';
import { refreshToken, verifyToken } from '../service/api/verifyToken';
import { LocalStorageService } from '../service/localStore';

const form = document.querySelector<HTMLFormElement>('.form');

/** Validate login info. */
function validateLogin(): void {
  if (form !== null) {
    const inputEmail = form.querySelector<HTMLInputElement>('input[data-type=email]') ;
    const inputPassword = form.querySelector<HTMLInputElement>('input[data-type=password]');
    const errorElement = form.querySelector<HTMLSpanElement>('.form__span-error');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (inputEmail === null || inputPassword === null) {
          return;
        }
        const userLoginInfo = new Login({
          email: inputEmail.value,
          password: inputPassword.value,
        });

        const result = await login(userLoginInfo);
        if (result instanceof HttpError) {
          if (errorElement === null || errorElement === undefined) {
            return;
          }
          errorElement.innerHTML = result.detail;
          return;
        }
        LocalStorageService.setValue<Token>(KEY_TOKEN, result);
        navigate(PROFILE_URL);
    });
  }

}

/** Check valid token. */
async function checkValidToken(): Promise<void> {
  const token = LocalStorageService.getValue<Token>(KEY_TOKEN);
  if (token === null) {
    return;
  }
  const response = await verifyToken(token);
  if (response instanceof HttpError) {
    setRefreshedTokenToLocalStore(token);
  }
  navigate(PROFILE_URL);

}

/**
 * Set refreshed token to local store.
 * @param token Token to refresh.
 */
async function setRefreshedTokenToLocalStore(token: Token): Promise<void> {
  const response = await refreshToken(token);
  if (response instanceof HttpError) {
    return;
  }
  LocalStorageService.setValue<Token>(KEY_TOKEN, response);
  navigate(PROFILE_URL);
}

validateLogin();
checkValidToken();
