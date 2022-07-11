import { HttpError } from '@js-camp/core/models/httpError';
import { Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';
import { queryErrorSpan } from '@js-camp/core/utils';

import { postUserLoginInfo } from '../services/api/login';
import { setValueToLocalStorage } from '../services/localStore';

const form = document.querySelector('.form__container');

if (form) {
  const inputEmail = document.querySelector('input[type=email]') as HTMLInputElement ;
  const inputPassword = document.querySelector('input[type=password]') as HTMLInputElement;
  const errorElement = document.querySelector('.error__message');
  form.addEventListener('submit', async(e): Promise<void> => {
    e.preventDefault();
    const userLoginInfo = new Login({
      email: inputEmail.value,
      password: inputPassword.value,
    });

    const result = await postUserLoginInfo(userLoginInfo);
    if (result instanceof HttpError) {
      const error = result.data;
      if (!error) {
        // eslint-disable-next-line no-alert
        if (!errorElement) {
          return;
        }
        errorElement.innerHTML = result.detail;
        return;
      }
      if (error.email) {
        queryErrorSpan(inputEmail, error.email);
      }
      if (error.password) {
        queryErrorSpan(inputPassword, error.password);
      }
      return;
    }
    // eslint-disable-next-line no-alert
    setValueToLocalStorage<Token>('Token', result);
});
}
