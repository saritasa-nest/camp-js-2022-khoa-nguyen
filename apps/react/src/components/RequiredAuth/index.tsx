import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';

type Props = PropsWithChildren;
export const RequiredAuth: FC<Props> = ({ children }) => {
  const { isAuthorized } = useAuth();
  const location = useLocation();

  return isAuthorized ? <>{children}</> : <Navigate to="/login" replace state={{ path: location.pathname }} />;
};
