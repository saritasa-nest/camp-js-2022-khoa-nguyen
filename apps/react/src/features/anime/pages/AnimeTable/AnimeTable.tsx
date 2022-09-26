import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';

import { DefaultLayout } from '../../../../layout';
import { AnimeSidebar } from '../../components/AnimeSidebar';

import style from './AnimeTablePage.module.css';

export const AnimeTablePageInner: FC = () => (
  <DefaultLayout>
    <div className={style['anime-table']}>
      <div className={style['anime-table__sidebar']}>
        <AnimeSidebar />
      </div>
      <div className={style['anime-table__content']}>
        <Outlet/>
      </div>
    </div>
  </DefaultLayout>
);

export const AnimeTablePage = memo(AnimeTablePageInner);
