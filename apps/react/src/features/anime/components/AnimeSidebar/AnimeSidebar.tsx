
import { List } from '@mui/material';
import { FC, memo } from 'react';

import { TabGroup } from '../../../../components';
import { AnimeFilter } from '../AnimeFilter';

import { AnimeInfiniteScroll } from '../AnimeInfiniteScroll/AnimeInfiniteScroll';
import { AnimeSearch } from '../AnimeSearch';
import { AnimeSorting } from '../AnimeSorting';

import style from './AnimeSidebar.module.css';

export const AnimeSidebarInner: FC = () => (
  <List component='aside' sx={{ padding: '20px' }} className={style['anime-sidebar']}>
    <TabGroup
      listTab={[
        {
          label: 'Search',
          panel: <AnimeSearch />,
        },
        { label: 'Filter', panel: <AnimeFilter /> },
        { label: 'Sorting', panel: <AnimeSorting /> },
      ]}
    />
    <AnimeInfiniteScroll />
  </List>
);

export const AnimeSidebar = memo(AnimeSidebarInner);
