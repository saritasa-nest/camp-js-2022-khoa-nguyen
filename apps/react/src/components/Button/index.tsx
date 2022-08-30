import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

import style from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {

  /** Style of button. */
  readonly customStyle?: 'primary' | 'light';

}

export const Button: FC<Props> = ({
  customStyle = 'primary',
  children,
  type = 'button',
  ...props
}) => (
  <button
    {...props}
    type={type}
    className={classNames(style['button'], {
      [style['button_primary']]: customStyle === 'primary',
      [style['button_light']]: customStyle === 'light',
    })}
  >
    {children}
  </button>
);
