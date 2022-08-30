import { ErrorUser, HttpError, User } from '@js-camp/core/models';
import { register } from '@js-camp/react/store/auth/dispatchers';
import { clearErrorMessage } from '@js-camp/react/store/auth/slice';
import { useAppDispatch } from '@js-camp/react/store/store';
import { Snackbar } from '@mui/material';
import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Button, Card } from '../../../../components';
import { FormInputItem } from '../../components/FormItem';
import style from '../auth.module.css';
import { SnackBarConfig } from '../type';

interface Register {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly lastName: string;

  /** Last name.*/
  readonly firstName: string;

  /** Password. */
  readonly password: string;

  /** Retype password. */
  readonly confirmPassword: string;
}

const validationSchema: yup.SchemaOf<Register> = yup.object().shape({
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

const initialValues: Register = {
  email: '',
  lastName: '',
  firstName: '',
  password: '',
  confirmPassword: '',
};

const SNACKBAR_INITIAL_VALUE = {
  isOpen: false,
  message: '',
  duration: 3000,
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>(
    SNACKBAR_INITIAL_VALUE,
  );

  const handleSubmit = async(
    { password, email, firstName, lastName }: Register,
    { setErrors }: FormikHelpers<Register>,
  ) => {
    const result = await dispatch(
      register(
        new User({
          password,
          email,
          firstName,
          lastName,
        }),
      ),
    );
    if (result.payload instanceof HttpError<ErrorUser>) {
      const { data, detail } = result.payload;
      setErrors({
        firstName: data?.firstName?.join('\n'),
        lastName: data?.lastName?.join('\n'),
        password: data?.password?.join('\n'),
        email: data?.email?.join('\n'),
      });
      setSnackbarConfig(prev => ({ ...prev, message: detail }));
      return;
    }
    navigate('/');
  };

  const handleCloseSnackbar = () => {
    setSnackbarConfig(prev => ({ ...prev, isOpen: false }));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  return (
    <div className={style['auth']}>
      <Card>
        <h1 className={style['auth__title']}>Welcome to Saritasa Anime</h1>
        <FormikProvider value={formik}>
          <Form className={style['auth__form']}>
            <FormInputItem label="Email" name="email" type="email" />
            <FormInputItem label="First name" name="firstName" />
            <FormInputItem label="Last name" name="lastName" />
            <FormInputItem label="Password" name="password" type="password" />
            <FormInputItem
              label="Confirm password"
              name="confirmPassword"
              type="password"
            />
            <p>
              Already have an account?{' '}
              <Link to="/login" className={style['auth__link']}>
                Login now!
              </Link>{' '}
            </p>
            <Button type="submit">Register</Button>
          </Form>
        </FormikProvider>
      </Card>
      <Snackbar
        open={snackbarConfig.isOpen}
        autoHideDuration={snackbarConfig.duration}
        onClose={handleCloseSnackbar}
        message={snackbarConfig.message}
      />
    </div>
  );
};
