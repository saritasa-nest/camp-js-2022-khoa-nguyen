import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';

import _style from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {

  /** Style of button. */
  readonly customStyle?: 'primary' | 'light';

  /** Children. */
  readonly children: ReactNode;

}

export const Button: React.FC<Props> = ({
  customStyle = 'primary',
  children,
  ...props
}) => (
  <button
    {...props}
    className={classNames(_style['button'], {
      [_style['button_primary']]: customStyle === 'primary',
      [_style['button_light']]: customStyle === 'light',
    })}
  >
    {children}
  </button>
);
