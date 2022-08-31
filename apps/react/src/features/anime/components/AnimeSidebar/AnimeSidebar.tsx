import { ListItem } from '@mui/material';

import { FC, memo } from 'react';

import { TabGroup } from '../../../../components';

import { AnimeInfiniteScroll } from '../AnimeInfiniteScroll/AnimeInfiniteScroll';
import { AnimeSearch } from '../AnimeSearch';
import { AnimeSorting } from '../AnimeSorting';

import style from './AnimeSidebar.module.css';

export const AnimeSidebarInner: FC = () => (
  <ListItem className={style['anime-sidebar']}>
    <TabGroup
      listTab={[
        {
            label: 'Search',
            panel: <AnimeSearch />,
        },
        { label: 'Filter', panel: <div>Filter</div> },
        { label: 'Sorting', panel: <AnimeSorting/> },
      ]}
    />
    <AnimeInfiniteScroll />
  </ListItem>
);

export const AnimeSidebar = memo(AnimeSidebarInner);
