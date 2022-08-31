import { setIsAuthorized } from '@js-camp/react/store/auth/slice';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { TokenService } from '../../api/services/tokenService';

import { useAppDispatch } from '../../store';

import style from './Header.module.css';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async() => {
    await TokenService.remove();
    dispatch(setIsAuthorized(false));
  };
  return (
    <div className={style['header']}>
      <div className={style['header__wrapper']}>
        <Link className={style['header__link']} to={'/'}>
          Home
        </Link>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
};
