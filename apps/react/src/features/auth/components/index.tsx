import { TextField, TextFieldProps } from '@mui/material';
import { FC, HTMLInputTypeAttribute } from 'react';

import { ErrorMessage, useField } from 'formik';

import style from './FormItem.module.css';

interface Props {

  /** Label. */
  readonly label: string;

  /** Input properties. */
  readonly propsInput?: TextFieldProps;

  /** Name of form field. */
  readonly name: string;

  /** Type of input. */
  readonly type?: HTMLInputTypeAttribute;
}

export const FormInputItem: FC<Props> = ({ label, propsInput, name, type }) => {
  const [field] = useField<string>({ name });
  return (
    <div className={style['form-item']}>
      <TextField
        className={style['form-item__input']}
        label={label}
        type={type}
        {...field}
        {...propsInput}
      />
      <ErrorMessage
        className={style['form-item__error']}
        component="span"
        name={field.name}
      />
    </div>
  );
};
