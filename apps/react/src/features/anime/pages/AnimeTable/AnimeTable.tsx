import { FC, memo } from 'react';

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
        <h1>Place holder for next implementation</h1>
      </div>
    </div>
  </DefaultLayout>
);

export const AnimeTablePage = memo(AnimeTablePageInner);