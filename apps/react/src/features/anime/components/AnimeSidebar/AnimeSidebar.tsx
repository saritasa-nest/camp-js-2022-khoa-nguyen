
import { List } from '@mui/material';
import { FC, memo } from 'react';

import { TabGroup } from '../../../../components';

import { AnimeInfiniteScroll } from '../AnimeInfiniteScroll/AnimeInfiniteScroll';

import style from './AnimeSidebar.module.css';

export const AnimeSidebarInner: FC = () => (
  <List component='aside' sx={{ padding: '10px' }} className={style['anime-sidebar']}>
    <TabGroup
      listTab={[
        {
            label: 'Search',
            panel: <div>Searching</div>,
        },
        { label: 'Filter', panel: <div>Filter</div> },
        { label: 'Sorting', panel: <div>Sorting</div> },
      ]}
    />
    <AnimeInfiniteScroll />
  </List>
);

export const AnimeSidebar = memo(AnimeSidebarInner);
