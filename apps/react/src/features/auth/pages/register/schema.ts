import * as yup from 'yup';

import { Register } from '.';

export const validationSchema: yup.SchemaOf<Register> = yup.object().shape({
  email: yup
    .string()
    .email('This field has to be an email!')
    .required('Email is required!'),
  password: yup.string().required('Password is required!'),
  lastName: yup.string().required('Last name is required!'),
  firstName: yup.string().required('First name is required!'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required!')
    .test(
      'is-match-password',
      'Confirm password does not match with password',
      function(value) {
        return value === this.parent.password;
      },
    ),
});
