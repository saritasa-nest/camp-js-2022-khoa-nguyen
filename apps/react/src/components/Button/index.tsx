import React, { ReactNode } from 'react';

import classNames from 'classnames';

import _style from './Button.module.css';

interface Props {

  /** Type of button. */
  readonly type?: 'reset' | 'submit' | 'button';

  /** Style of button. */
  readonly style?: 'primary' | 'light';

  /** Children. */
  readonly children: ReactNode;

  /** Click event. */
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<Props> = ({
  type = 'button',
  style = 'primary',
  children,
  onClick,
}) => (
  <button
    onClick={onClick}
    type={type}
    className={classNames(_style['button'], {
      [_style['button_primary']]: style === 'primary',
      [_style['button_light']]: style === 'light',
    })}
  >
    {children}
  </button>
);
