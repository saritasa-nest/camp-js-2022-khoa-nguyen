import { Form, Formik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as yup from 'yup';

import { Button, Card } from '../../../../components';
import { FormInputItem } from '../../components';
import style from '../auth.module.css';
import { StateLocation } from '../type';

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

export const RegisterPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (value: Register) => {
    console.log(value);
    navigate((state as StateLocation).path ?? '/');
  };
  return <div className={style['auth']}>
    <Card>
      <h1 className={style['auth__title']}>Welcome to Saritasa Anime</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          console.log(values);
          return (
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
              <p>Already have an account? <Link to='/login' className={style['auth__link']}>Login now!</Link> </p>
              <Button type="submit">Register</Button>
            </Form>
          );
        }}
      </Formik>
    </Card>
  </div>;
};
