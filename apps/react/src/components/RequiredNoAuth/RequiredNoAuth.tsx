import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks';

export const RequiredNoAuth: FC = () => {
  const { isAuthorized } = useAuth();
  if (!isAuthorized) {
    return <Outlet/>;
  }
  return <Navigate to={'/'} replace />;
};
