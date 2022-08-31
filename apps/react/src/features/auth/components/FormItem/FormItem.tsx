import { FC, HTMLInputTypeAttribute } from 'react';

import { ErrorMessage, Field, useField } from 'formik';

import { TextField, TextFieldProps } from '@mui/material';

import style from './FormItem.module.css';

interface Props {

  /** Label. */
  readonly label: string;

  /** Props input. */
  readonly propsInput?: TextFieldProps;

  /** Name of form field. */
  readonly name: string;

  /** Type of input. */
  readonly type?: HTMLInputTypeAttribute;
}

export const FormInputItem: FC<Props> = ({ label, name, type, propsInput }) => {
  const [field] = useField<string>({ name });
  return (
    <div className={style['form-item']}>
      <Field
        as={TextField}
        className={style['form-item__input']}
        {...field}
        {...propsInput}
        label={label}
        type={type}
      />
      <ErrorMessage
        className={style['form-item__error']}
        component="span"
        name={field.name}
      />
    </div>
  );
};
