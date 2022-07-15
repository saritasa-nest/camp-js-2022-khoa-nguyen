import { HttpError } from '@js-camp/core/models/httpError';
import { Token } from '@js-camp/core/models/token';
import { User } from '@js-camp/core/models/user';
import { navigate, queryErrorSpan } from '@js-camp/core/utils';

import { PROFILE_URL, TOKEN_KEY } from '../../constant';

import { validateConfirmPassword } from '../../scripts/validate';
import { registerNewUser } from '../../services/api/register';
import { setValueToLocalStorage } from '../../services/localStore';

/** Validate register info. */
function validateRegisterInfo(): void {
  const form = document.querySelector('.form');
  if (form === undefined || form === null) {
    return;
  }
  const inputEmail = form.querySelector('input[data-type=email]') as HTMLInputElement ;
  const inputPassword = form.querySelector('input[data-type=password]') as HTMLInputElement;
  const inputConfirmPassword = form.querySelector('input[data-type=confirmPassword]') as HTMLInputElement;
  const inputFirstName = form.querySelector('input[data-type=firstName]') as HTMLInputElement;
  const inputLastName = form.querySelector('input[data-type=lastName]') as HTMLInputElement;
  form.addEventListener('submit', async(event): Promise<void> => {
      event.preventDefault();
      const user = new User({
        email: inputEmail.value,
        password: inputPassword.value,
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
      });
      const isValidPassword = validateConfirmPassword({ passwordElement: inputPassword, confirmPasswordElement: inputConfirmPassword },
        'This field must be matched with password field');
        if (isValidPassword === false) {
          return;
        }
        const result = await registerNewUser(user);
        if (result instanceof HttpError) {
          const error = result.data;
          if (error === null || error === undefined) {
            // eslint-disable-next-line no-alert
            alert(result.detail);
            return;
          }
          queryErrorSpan(inputEmail, error.email);
          queryErrorSpan(inputFirstName, error.firstName);
          queryErrorSpan(inputLastName, error.lastName);
          queryErrorSpan(inputPassword, error.password);
          return;
        }
        // eslint-disable-next-line no-alert
        alert('Signup success!');
        setValueToLocalStorage<Token>(TOKEN_KEY, result);
        navigate(PROFILE_URL);

    });
}

validateRegisterInfo();
