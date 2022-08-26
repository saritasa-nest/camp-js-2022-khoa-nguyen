import React, { ReactNode } from 'react';

import { Header } from '../header';

import style from './DefaultLayout.module.css';

interface Props {

  // eslint-disable-next-line jsdoc/require-jsdoc
  readonly children: ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }) => (
  <>
    <Header/>
    <div className={style['default-layout']}>
      {children}
    </div>
  </>
);
