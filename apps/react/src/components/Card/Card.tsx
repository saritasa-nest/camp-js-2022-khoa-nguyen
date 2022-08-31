import { FC, PropsWithChildren } from 'react';

import { Card as CardMaterial } from '@mui/material';

import style from './Card.module.css';

type Props = PropsWithChildren;

export const Card: FC<Props> = ({ children }) => (
  <CardMaterial className={style['card']}>
    {children}
  </CardMaterial>
);
