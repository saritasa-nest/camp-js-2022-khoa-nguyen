import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';

export const RequiredAuth: FC = () => {
  const { isAuthorized } = useAuth();
  const location = useLocation();

  if (isAuthorized) {
    return <Outlet/>;
  }
  return <Navigate to="/login" replace state={{ path: location.pathname }} />;
};
