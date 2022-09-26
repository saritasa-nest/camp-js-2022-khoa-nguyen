import { Switch, TextField, TextFieldProps } from '@mui/material';
import { Field, useField } from 'formik';
import { FC } from 'react';

import { AppDatePicker } from '../AppDatePicker';

import { AppSelect, SelectItem } from '../AppSelect';

import style from './FormItem.module.css';
import { FormItemWrapper } from './FormItemWrapper';

interface Props {

  /** Label. */
  readonly label?: string;

  /** Props input. */
  readonly propsInput?: TextFieldProps;

  /** Name of form field. */
  readonly name: string;

  /** Component. */
  readonly as?: typeof AppSelect | typeof Switch | typeof AppDatePicker;

  /** Select list. */
  readonly list?: readonly SelectItem[];
}

export const FormInputItem: FC<Props> = ({
  label,
  name,
  propsInput,
  as,
  list,
}) => {
  const [field] = useField({ name });
  return (
    <FormItemWrapper name={field.name}>
      <Field
        as={as ?? TextField}
        className={style['form-item__input']}
        list={list}
        {...field}
        {...propsInput}
        label={label}
      />
    </FormItemWrapper>
  );
};
