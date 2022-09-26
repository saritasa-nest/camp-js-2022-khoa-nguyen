import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { NotFound, RequiredAuth } from '../components';
import { RequiredNoAuth } from '../components/RequiredNoAuth';

import { animeRoutes } from '../features/anime/routes';

import { authRoutes } from '../features/auth/routes';

const routes: RouteObject[] = [
  { element: <RequiredAuth/>, children: [...animeRoutes] },
  { element: <RequiredNoAuth/>, children: [...authRoutes] },
  { path: '*', element: <NotFound/> },
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
