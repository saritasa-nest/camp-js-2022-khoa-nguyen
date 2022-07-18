import { HttpError } from '@js-camp/core/models/httpError';
import { Token } from '@js-camp/core/models/token';
import { User } from '@js-camp/core/models/user';
import { navigate, queryErrorSpan } from '@js-camp/core/utils';

import { PROFILE_URL, TOKEN_KEY } from '../../constant';

import { validateConfirmPassword } from '../../scripts/validate';
import { registerNewUser } from '../../services/api/register';
import { LocalStorageService } from '../../services/localStore';

/** Validate register info. */
function validateRegisterInfo(): void {
  const form = document.querySelector<HTMLFormElement>('.form');
  if (form === undefined || form === null) {
    return;
  }
  const inputEmail = form.querySelector<HTMLInputElement>('input[data-type=email]');
  const inputPassword = form.querySelector<HTMLInputElement>('input[data-type=password]');
  const inputConfirmPassword = form.querySelector<HTMLInputElement>('input[data-type=confirmPassword]');
  const inputFirstName = form.querySelector<HTMLInputElement>('input[data-type=firstName]');
  const inputLastName = form.querySelector<HTMLInputElement>('input[data-type=lastName]');
  form.addEventListener('submit', async(event): Promise<void> => {
    event.preventDefault();
    if (
      inputEmail === null ||
      inputFirstName === null ||
      inputConfirmPassword === null ||
      inputPassword === null ||
      inputLastName === null
    ) {
      return;
    }
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
    const result = await registerNewUser(user);
    if (result instanceof HttpError) {
      const error = result.data;
      if (error === null || error === undefined) {
        return;
      }
      queryErrorSpan(inputEmail, error.email);
      queryErrorSpan(inputFirstName, error.firstName);
      queryErrorSpan(inputLastName, error.lastName);
      queryErrorSpan(inputPassword, error.password);
      return;
    }
    LocalStorageService.setValue<Token>(TOKEN_KEY, result);
    navigate(PROFILE_URL);
  });
}

validateRegisterInfo();
