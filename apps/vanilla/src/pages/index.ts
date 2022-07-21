import { HttpError } from '@js-camp/core/models/httpError';
import { Login } from '@js-camp/core/models/login';
import { navigate } from '@js-camp/core/utils';

import { HOME_URL } from '../constants';

import { AuthorizationService } from '../services/authorization';

/** Check if user have logged in. */
async function checkIsLoggedIn(): Promise<void> {
  if (await AuthorizationService.isLoggedIn()) {
    navigate(HOME_URL);
  } else {
    validateLogin();
  }
}

/** Validate login info. */
function validateLogin(): void {
  const form = document.querySelector<HTMLFormElement>('.form');
  if (form == null) {
    return;
  }
  const inputEmail = form.querySelector<HTMLInputElement>('input[data-type=email]') ;
  const inputPassword = form.querySelector<HTMLInputElement>('input[data-type=password]');
  const errorElement = form.querySelector<HTMLSpanElement>('.form__span_error');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (inputEmail == null || inputPassword == null) {
      return;
    }
    const userLoginInfo = new Login({
      email: inputEmail.value,
      password: inputPassword.value,
    });

    const result = await AuthorizationService.getToken(userLoginInfo);
    if (!(result instanceof HttpError)) {
      return;
    }
    if (errorElement == null) {
      return;
    }
    errorElement.innerHTML = result.detail;
  });
}

checkIsLoggedIn();
