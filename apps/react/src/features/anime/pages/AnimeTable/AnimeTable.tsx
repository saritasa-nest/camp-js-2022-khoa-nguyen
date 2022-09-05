import { FC, memo } from 'react';

import { DefaultLayout } from '../../../../layout';

import { AnimeSidebar } from '../../components/AnimeSidebar';
import { AnimeDetail } from '../../components/AnimeDetail';

import style from './AnimeTablePage.module.css';

export const AnimeTablePageInner: FC = () => (
  <DefaultLayout>
    <div className={style['anime-table']}>
      <div className={style['anime-table__sidebar']}>
        <AnimeSidebar />
      </div>
      <div className={style['anime-table__content']}>
        <AnimeDetail/>
      </div>
    </div>
  </DefaultLayout>
);

export const AnimeTablePage = memo(AnimeTablePageInner);
