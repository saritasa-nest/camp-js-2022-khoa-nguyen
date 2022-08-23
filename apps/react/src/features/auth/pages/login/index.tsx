import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import { Button, Card } from '../../../../components';

import { FormInputItem } from '../../components';

import style from '../auth.module.css';

interface Login {

  /** Email. */
  readonly email: string;

  /** Password. */
  readonly password: string;
}

const validationSchema: yup.SchemaOf<Login> = yup.object().shape({
  email: yup
    .string()
    .email('This field has to be an email!')
    .required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

const initialValues: Login = { email: '', password: '' };

export const LoginPage: React.FC = () => (
  <div className={style['auth']}>
    <Card>
      <h1 className={style['auth__title']}>Welcome to Saritasa Anime</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values }) => {
          console.log(values);
          return (
            <Form className={style['auth__form']}>
              <FormInputItem label="Email" name="email" type="email" />
              <FormInputItem label="Password" name="password" type="password" />
              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </Card>
  </div>
);
