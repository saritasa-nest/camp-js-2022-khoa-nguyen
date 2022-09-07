import { ErrorUser, HttpError, User } from '@js-camp/core/models';
import { register } from '@js-camp/react/store/auth/dispatchers';
import { selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import {
  clearErrorMessage,
  setIsAuthorized,
} from '@js-camp/react/store/auth/slice';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { LoadingButton } from '@mui/lab';
import { Card } from '@mui/material';
import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FormInputItem } from '../../../../components/FormItem';
import style from '../auth.module.css';

import { validationSchema } from './schema';

/** Register schema. */
export interface Register {

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

const initialValues: Register = {
  email: '',
  lastName: '',
  firstName: '',
  password: '',
  confirmPassword: '',
};

export const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isLoading = useAppSelector(selectIsAuthLoading);

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

      enqueueSnackbar(detail, { variant: 'error' });
      setErrors(data);
      return;
    }
    enqueueSnackbar('Register successfully!', { variant: 'success' });
    dispatch(setIsAuthorized(true));
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
            <LoadingButton
              loading={isLoading}
              color="primary"
              variant="contained"
              type="submit"
            >
              Register
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Card>
    </div>
  );
};
