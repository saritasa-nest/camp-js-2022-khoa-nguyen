import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TokenService } from '../api/services/tokenService';
import { useAppDispatch } from '../store';
import { selectIsAuth } from '../store/auth/selectors';
import { setIsAuthorized } from '../store/auth/slice';

export const useAuth = () => {

  const dispatch = useAppDispatch();
  const checkAuth = async() => {
    if (!await TokenService.isValid()) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    checkAuth().then(isAuthorized => dispatch(setIsAuthorized(isAuthorized)));
  }, []);
  return { isAuthorized: useSelector(selectIsAuth) };
};
