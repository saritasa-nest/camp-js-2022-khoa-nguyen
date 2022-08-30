import { FC, PropsWithChildren } from 'react';

import { Header } from '../header';

import style from './DefaultLayout.module.css';

type Props = PropsWithChildren;

export const DefaultLayout: FC<Props> = ({ children }) => (
  <>
    <Header/>
    <div className={style['default-layout']}>
      {children}
    </div>
  </>
);
