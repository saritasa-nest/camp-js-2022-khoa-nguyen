import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const AnimeTablePage = lazy(() =>
  import('./pages/AnimeTable').then(module => ({
    default: module.AnimeTablePage,
  })));

export const animeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AnimeTablePage />,
  },
];
