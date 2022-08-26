import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks';

interface Props {

  // eslint-disable-next-line jsdoc/require-jsdoc
  readonly children: ReactNode;
}

export const PreventAuth: React.FC<Props> = ({ children }) => {
  const { isAuth } = useAuth();

  return !isAuth ? <>{children}</> : <Navigate to={'/'} replace />;
};
