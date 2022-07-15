import { HttpError } from '@js-camp/core/models/httpError';
import { Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';

import { PROFILE_URL, TOKEN_KEY } from '../constant';

import { postUserLoginInfo } from '../services/api/login';
import { postRefreshToken, postTokenToVerify } from '../services/api/verifyToken';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../services/localStore';

const form = document.querySelector('.form');

/** Validate login info. */
function validateLogin(): void {
  if (form === undefined || form === null) {
    return;
  }
  const inputEmail = document.querySelector('input[data-type=email]') as HTMLInputElement ;
  const inputPassword = document.querySelector('input[data-type=password]') as HTMLInputElement;
  const errorElement = document.querySelector('.form__span-error');
  form.addEventListener('submit', async(e): Promise<void> => {
      e.preventDefault();
      const userLoginInfo = new Login({
        email: inputEmail.value,
        password: inputPassword.value,
      });

      const result = await postUserLoginInfo(userLoginInfo);
      if (result instanceof HttpError) {
        if (errorElement === null || errorElement === undefined) {
          return;
        }
        errorElement.innerHTML = result.detail;
        return;
      }
      // eslint-disable-next-line no-alert
      alert('Login success!');
      setValueToLocalStorage<Token>(TOKEN_KEY, result);
      window.location.href = PROFILE_URL;

  });
}

/** Check valid token. */
async function checkValidToken(): Promise<void> {
  const token = getValueFromLocalStorage<Token>(TOKEN_KEY);
  if (token === null) {
    return;
  }
  const response = await postTokenToVerify(token);
  if (response instanceof HttpError) {
    refreshToken(token);
  }
  window.location.href = PROFILE_URL;

}

/** Refresh token.
 * @param token Token to refresh.
 */
async function refreshToken(token: Token): Promise<void> {
  const response = await postRefreshToken(token);
  if (response instanceof HttpError) {
    return;
  }
  setValueToLocalStorage<Token>(TOKEN_KEY, response);
  window.location.href = PROFILE_URL;
}

validateLogin();
checkValidToken();
