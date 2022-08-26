import { ListItem } from '@mui/material';

import React, { memo } from 'react';

import { TabGroup } from '../../../../components';

import { AnimeInfinitiveScroll } from '../AnimeInfinitiveScroll';
import { AnimeSearch } from '../AnimeSearch';

import style from './AnimeSidebar.module.css';

export const AnimeSidebarInner: React.FC = () => (
  <ListItem className={style['anime-sidebar']}>
    <TabGroup
      listTab={[
        {
            label: 'Search',
            panel: <AnimeSearch />,
        },
        { label: 'Filter', panel: <div>Filter</div> },
        { label: 'Sorting', panel: <div>Sorting</div> },
      ]}
    />
    <AnimeInfinitiveScroll />
  </ListItem>
);

export const AnimeSidebar = memo(AnimeSidebarInner);
