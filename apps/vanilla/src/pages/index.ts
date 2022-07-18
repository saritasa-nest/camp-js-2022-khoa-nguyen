import { HttpError } from '@js-camp/core/models/httpError';
import { Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';
import { navigate } from '@js-camp/core/utils';

import { HOME_URL, TOKEN_KEY } from '../constants';

import { login } from '../services/api/login';
import { refreshToken, verifyToken } from '../services/api/verifyToken';
import { LocalStorageService } from '../services/localStore';

/** Validate login info. */
function validateLogin(): void {
  const form = document.querySelector<HTMLFormElement>('.form');
  if (form != null) {
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
        LocalStorageService.setValue<Token>(TOKEN_KEY, result);
        navigate(HOME_URL);
    });
  }

}

/** Check valid token. */
async function checkValidToken(): Promise<void> {
  const token = LocalStorageService.getValue<Token>(TOKEN_KEY);
  if (token === null) {
    return;
  }
  const response = await verifyToken(token);
  if (response instanceof HttpError) {
    setRefreshedTokenToLocalStore(token);
  }
  navigate(HOME_URL);

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
  LocalStorageService.setValue<Token>(TOKEN_KEY, response);
  navigate(HOME_URL);
}

validateLogin();
checkValidToken();
