import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { RequiredNoAuth } from '../../components/RequiredNoAuth/RequiredNoAuth';

const LoginPage = lazy(() => import('./pages/login').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/register').then(module => ({ default: module.RegisterPage })));

export const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <RequiredNoAuth>
      <LoginPage />
    </RequiredNoAuth>,
  },
  {
    path: 'register',
    element: <RequiredNoAuth>
      <RegisterPage />
    </RequiredNoAuth>,
  },
];
