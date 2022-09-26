import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AnimeCreatePage } from './pages/AnimeCreatePage';

import { AnimeDetailPage } from './pages/AnimeDetailPage';
import { AnimeEditPage } from './pages/AnimeEditPage';

const AnimeTablePage = lazy(() =>
  import('./pages/AnimeTable').then(module => ({
    default: module.AnimeTablePage,
  })));

const animeRoutesInner: RouteObject[] = [
  {
    path: '/',
    element: <AnimeDetailPage/>,
  },
  {
    path: '/detail/:id',
    element: <AnimeDetailPage />,
  },
  {
    path: '/edit/:id',
    element: <AnimeEditPage />,
  },
  {
    path: '/create',
    element: <AnimeCreatePage />,
  },
];

export const animeRoutes: RouteObject[] = [{ element: <AnimeTablePage/>, children: [...animeRoutesInner] }];
