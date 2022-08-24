import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { PreventAuth } from '../../components/PreventAuth';

const LoginPage = lazy(() => import('./pages/login').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/register').then(module => ({ default: module.RegisterPage })));

export const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <PreventAuth>
      <LoginPage />
    </PreventAuth>,
  },
  {
    path: 'register',
    element: <PreventAuth>
      <RegisterPage />
    </PreventAuth>,
  },
];
