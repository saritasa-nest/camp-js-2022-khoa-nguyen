import { LoginModel } from '@js-camp/core/models';
import * as yup from 'yup';

export const validationSchema: yup.SchemaOf<LoginModel> = yup.object().shape({
  email: yup
    .string()
    .email('This field has to be an email!')
    .required('Email is required!'),
  password: yup.string().required('Password is required!'),
});
