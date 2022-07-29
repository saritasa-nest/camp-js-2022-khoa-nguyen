import { ErrorUser, User } from '@js-camp/core/models/user';
import { queryErrorSpan } from '@js-camp/core/utils';

import { validateConfirmPassword } from '../../scripts/validate';
import { AuthorizationService } from '../../services/authorization';

/** Validate register info. */
function validateRegisterInfo(): void {
  const form = document.querySelector<HTMLFormElement>('.form');
  if (form == null) {
    return;
  }
  const inputEmail = form.querySelector<HTMLInputElement>('input[data-type=email]');
  const inputPassword = form.querySelector<HTMLInputElement>('input[data-type=password]');
  const inputConfirmPassword = form.querySelector<HTMLInputElement>('input[data-type=confirmPassword]');
  const inputFirstName = form.querySelector<HTMLInputElement>('input[data-type=firstName]');
  const inputLastName = form.querySelector<HTMLInputElement>('input[data-type=lastName]');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (
      inputEmail == null ||
      inputFirstName == null ||
      inputConfirmPassword == null ||
      inputPassword == null ||
      inputLastName == null
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
    const result = await AuthorizationService.signUp(user);
    if (result instanceof ErrorUser) {
      queryErrorSpan(inputEmail, result.email);
      queryErrorSpan(inputFirstName, result.firstName);
      queryErrorSpan(inputLastName, result.lastName);
      queryErrorSpan(inputPassword, result.password);
    }
  });
}

validateRegisterInfo();
