import { HttpError, Login, LoginModel } from '@js-camp/core/models';
import {
  login,
} from '@js-camp/react/store/auth/dispatchers';
import { clearErrorMessage } from '@js-camp/react/store/auth/slice';
import { useAppDispatch } from '@js-camp/react/store/store';
import { Snackbar } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Card } from '../../../../components';

import { FormInputItem } from '../../components/FormItem';

import style from '../auth.module.css';
import { SnackBarConfig } from '../type';

import { validationSchema } from './shema';

const SNACKBAR_INITIAL_VALUE = {
  isOpen: false,
  message: '',
  duration: 3000,
};

const initialValues: LoginModel = { email: '', password: '' };

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>(
    SNACKBAR_INITIAL_VALUE,
  );

  const handleSubmit = async({ email, password }: LoginModel) => {
    const result = await dispatch(login(new Login({ email, password })));
    if (result.payload instanceof HttpError<Login>) {
      const errorDetail = result.payload.detail;
      setSnackbarConfig(prev => ({ ...prev, isOpen: true, message: errorDetail }));
      return;
    }
    navigate('/');
  };

  const handleCloseSnackbar = () => {
    setSnackbarConfig(prev => ({ ...prev, isOpen: false }));
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
            <Button type="submit">Login</Button>
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
