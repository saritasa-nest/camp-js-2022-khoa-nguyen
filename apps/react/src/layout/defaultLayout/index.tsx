import React, { ReactNode } from 'react';

import { Header } from '../header';

import style from './DefaultLayout.module.css';

interface Props {

  /** Children. */
  readonly children: ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }) => (
  <div>
    <Header/>
    <div className={style['default-layout']}>
      {children}
    </div>
  </div>
);
