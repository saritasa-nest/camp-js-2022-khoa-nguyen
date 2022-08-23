import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import { Button, Card } from '../../../../components';

import { FormInputItem } from '../../components';

import style from './login.module.css';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('This field has to be an email!')
    .required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

export const LoginPage: React.FC = () => (
  <div className={style['login']}>
    <Card>
      <h1 className={style['login__title']}>Welcome to Saritasa Anime</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => {
        console.log(values);
      }}
      >
        {({ values }) => {
        console.log(values);
        return (
          <Form className={style['login__form']}>
            <FormInputItem label="Email" name="email" type="email" />
            <FormInputItem
              label="Password"
              name="password"
              type="password"
            />
            <Button type="submit">Submit</Button>
          </Form>
        );
      }}
      </Formik>
    </Card>
  </div>
);
