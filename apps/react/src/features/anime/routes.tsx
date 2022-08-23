import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { RequiredAuth } from '../../components';

const AnimeTablePage = lazy(() =>
  import('./pages/anime-table').then(module => ({
    default: module.AnimeTablePage,
  })));

export const animeRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RequiredAuth>
        <AnimeTablePage />
      </RequiredAuth>
    ),
  },
];
