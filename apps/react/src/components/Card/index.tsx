import React, { ReactNode } from 'react';

import { Card as CardMaterial } from '@mui/material';

import style from './Card.module.css';

interface Props {

  /** Children. */
  readonly children: ReactNode;
}

export const Card: React.FC<Props> = ({ children }) => (
  <CardMaterial className={style['card']}>
    {children}
  </CardMaterial>
);
