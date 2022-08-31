import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks';

type Props = PropsWithChildren;
export const RequiredNoAuth: FC<Props> = ({ children }) => {
  const { isAuthorized } = useAuth();

  return !isAuthorized ? <>{children}</> : <Navigate to={'/'} replace />;
};
