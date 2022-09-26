import { ErrorMessage } from 'formik';
import { FC, PropsWithChildren } from 'react';

import style from '../FormItem.module.css';

type Props = PropsWithChildren<{name: string;}>;

export const FormItemWrapper: FC<Props> = ({ children, name }) => (
  <div className={style['form-item']}>
    {children}
    <ErrorMessage className={style['form-item__error']} component="span" name={name} />
  </div>
);
