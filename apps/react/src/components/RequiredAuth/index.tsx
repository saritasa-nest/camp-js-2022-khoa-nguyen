import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {

  /** Children. */
  readonly children: ReactNode;
}

export const RequiredAuth: React.FC<Props> = ({ children }) => {
  const isAuth = false;
  const location = useLocation();

  return isAuth ? <>{children}</> : <Navigate to="/login" replace state={{ path: location.pathname }} />;
};
