import { HttpError } from '@js-camp/core/models/httpError';
import { Token } from '@js-camp/core/models/token';
import { User } from '@js-camp/core/models/user';
import { queryErrorSpan } from '@js-camp/core/utils';

import { validateConfirmPassword } from '../../scripts/validate';
import { postUserRegistration } from '../../services/api/register';
import { setValueToLocalStorage } from '../../services/localStore';

const form = document.querySelector('.form__container');

if (form) {
  const inputEmail = form.querySelector('input[data-type=email]') as HTMLInputElement ;
  const inputPassword = form.querySelector('input[data-type=password]') as HTMLInputElement;
  const inputConfirmPassword = form.querySelector('input[data-type=confirmPassword]') as HTMLInputElement;
  const inputFirstName = form.querySelector('input[data-type=firstName]') as HTMLInputElement;
  const inputLastName = form.querySelector('input[data-type=lastName]') as HTMLInputElement;
  form.addEventListener('submit', async(e): Promise<void> => {
    e.preventDefault();
    const user = new User({
      email: inputEmail.value,
      password: inputPassword.value,
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
    });

    const isValidPassword = validateConfirmPassword({ passwordElement: inputPassword, confirmPasswordElement: inputConfirmPassword },
      'This field must be matched with password field');

      if (!isValidPassword) {
        return;
      }
      const result = await postUserRegistration(user);
      if (result instanceof HttpError) {
        const error = result.data;
        if (!error) {
          // eslint-disable-next-line no-alert
          alert(result.detail);
          return;
        }
        if (error.email) {
          queryErrorSpan(inputEmail, error.email);
        }
        if (error.firstName) {
          queryErrorSpan(inputEmail, error.firstName);
        }
        if (error.lastName) {
          queryErrorSpan(inputEmail, error.lastName);
        }
        if (error.password) {
          queryErrorSpan(inputPassword, error.password);
        }
        return;
      }
      // eslint-disable-next-line no-alert
      alert('Signup success!');
      setValueToLocalStorage<Token>('Token', result);
  });
}
