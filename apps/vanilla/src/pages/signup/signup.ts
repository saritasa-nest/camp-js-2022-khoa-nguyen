import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { User } from '@js-camp/core/models/user';

import { appAxios } from '../../axios';
import { DEFAULT_AVATAR_URL } from '../../constant';
import { validate } from '../../scripts/validate';

const inputEmail = document.querySelector('input[data-type=email]') as HTMLInputElement ;
const inputPassword = document.querySelector('input[data-type=password]') as HTMLInputElement;
const inputConfirmPassword = document.querySelector('input[data-type=confirmPassword]') as HTMLInputElement;
const inputFirstName = document.querySelector('input[data-type=firstName]') as HTMLInputElement;
const inputLastName = document.querySelector('input[data-type=lastName]') as HTMLInputElement;

const form = document.querySelector('.form__container');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const user = new User({
      email: inputEmail.value,
      password: inputPassword.value,
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      avatar: DEFAULT_AVATAR_URL,
    });

    const isValidPassword = validate({ passwordElement: inputPassword, confirmPasswordElement: inputConfirmPassword },
      'This field must be match with password field');
    if (isValidPassword) {
      console.log(UserMapper.toDto(user));
      appAxios.post('/auth/register', UserMapper.toDto(user));
    }
  });
}
