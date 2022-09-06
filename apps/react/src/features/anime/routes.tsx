import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AnimeDetail } from './components/AnimeDetail';
import { AnimeEdit } from './components/AnimeEdit';

const AnimeTablePage = lazy(() =>
  import('./pages/AnimeTable').then(module => ({
    default: module.AnimeTablePage,
  })));

const animeRoutesInner: RouteObject[] = [
  {
    path: '/',
    element: <AnimeDetail/>,
  },
  {
    path: '/detail/:id',
    element: <AnimeDetail />,
  },
  {
    path: '/edit/:id',
    element: <AnimeEdit />,
  },
];

export const animeRoutes: RouteObject[] = [{ element: <AnimeTablePage/>, children: [...animeRoutesInner] }];
