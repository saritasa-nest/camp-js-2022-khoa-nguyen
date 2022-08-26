import React, { ReactNode } from 'react';

import { Card as CardMaterial } from '@mui/material';

import style from './Card.module.css';

interface Props {

  // eslint-disable-next-line jsdoc/require-jsdoc
  readonly children: ReactNode;
}

export const Card: React.FC<Props> = ({ children }) => (
  <CardMaterial className={style['card']}>
    {children}
  </CardMaterial>
);
