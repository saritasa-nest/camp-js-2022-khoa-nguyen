import { setIsAuth } from '@js-camp/react/store/auth/slice';
import { Link } from 'react-router-dom';

import { TokenService } from '../../api/services/tokenService';

import { Button } from '../../components';
import { useAppDispatch } from '../../store';

import style from './Header.module.css';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async() => {
    await TokenService.remove();
    dispatch(setIsAuth(false));
  };
  return <div className={style['header']}>
    <div className={style['header__wrapper']}>
      <Link className={style['header__link']} to={'/'}>Home</Link>
      <Button onClick={handleLogout} >Log out</Button>
    </div>
  </div>;
};
