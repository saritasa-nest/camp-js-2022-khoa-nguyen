import { HttpError, Login, LoginModel } from '@js-camp/core/models';
import { login } from '@js-camp/react/store/auth/dispatchers';
import {
  clearErrorMessage,
  setIsAuthorized,
} from '@js-camp/react/store/auth/slice';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Card } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';

import { selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';

import { FormInputItem } from '../../components/FormItem';

import style from '../auth.module.css';

import { validationSchema } from './shema';

const initialValues: LoginModel = { email: '', password: '' };

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const handleSubmit = async({ email, password }: LoginModel) => {
    const result = await dispatch(login(new Login({ email, password })));
    if (result.payload instanceof HttpError<Login>) {
      const errorDetail = result.payload.detail;
      enqueueSnackbar(errorDetail, { variant: 'error' });
    }
    enqueueSnackbar('Login successfully!', { variant: 'success' });
    dispatch(setIsAuthorized(true));
  };

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={style['auth']}>
      <Card>
        <h1 className={style['auth__title']}>Welcome to Saritasa Anime</h1>
        <FormikProvider value={formik}>
          <Form className={style['auth__form']}>
            <FormInputItem label="Email" name="email" type="email" />
            <FormInputItem label="Password" name="password" type="password" />
            <p>
              Don't have an account?{' '}
              <Link className={style['auth__link']} to="/register">
                Register now!
              </Link>{' '}
            </p>
            <LoadingButton loading={isLoading} color="primary" variant="contained" type="submit">
              Login
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Card>
    </div>
  );
};
