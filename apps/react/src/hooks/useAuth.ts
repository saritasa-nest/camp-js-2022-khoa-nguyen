import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TokenService } from '../api/services/tokenService';
import { useAppDispatch } from '../store';
import { selectIsAuth } from '../store/auth/selectors';
import { setIsAuth } from '../store/auth/slice';

export const useAuth = () => {

  const dispatch = useAppDispatch();
  const checkAuth = async() => {
    const token = await TokenService.get();
    if (token == null) {
      return false;
    }
    if (!TokenService.isValid(token)) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    checkAuth().then(isAuth => dispatch(setIsAuth(isAuth)));
  }, []);
  return { isAuth: useSelector(selectIsAuth) };
};
