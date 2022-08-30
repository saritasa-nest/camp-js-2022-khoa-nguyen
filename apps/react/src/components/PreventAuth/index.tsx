import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks';

type Props = PropsWithChildren;

export const PreventAuth: React.FC<Props> = ({ children }) => {
  const { isAuthorized } = useAuth();

  return !isAuthorized ? <>{children}</> : <Navigate to={'/'} replace />;
};
