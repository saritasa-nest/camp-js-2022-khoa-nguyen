import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';

interface Props {

  // eslint-disable-next-line jsdoc/require-jsdoc
  readonly children: ReactNode;
}

export const RequiredAuth: React.FC<Props> = ({ children }) => {
  const { isAuthorized } = useAuth();
  const location = useLocation();

  return isAuthorized ? <>{children}</> : <Navigate to="/login" replace state={{ path: location.pathname }} />;
};
