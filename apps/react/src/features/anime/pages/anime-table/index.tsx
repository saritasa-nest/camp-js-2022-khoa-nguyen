import { Card } from '../../../../components';

import { DefaultLayout } from '../../../../layout';

import { AnimeSidebar } from '../../components/AnimeSidebar';

import style from './AnimeTablePage.module.css';

export const AnimeTablePage: React.FC = () => (
  <DefaultLayout>
    <div className={style['anime-table']}>
      <div className={style['anime-table__sidebar']}>
        <AnimeSidebar
          onSelectAnime={function(anime): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      <div className={style['anime-table__content']}>
        <h1>Place holder for next implementation</h1>
      </div>
    </div>
  </DefaultLayout>
);
