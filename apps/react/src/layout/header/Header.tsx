import { setIsAuthorized } from '@js-camp/react/store/auth/slice';
import { Button, Stack } from '@mui/material';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { TokenService } from '../../api/services/tokenService';
import { useQueryParam } from '../../hooks';

import { useAppDispatch } from '../../store';

import style from './Header.module.css';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { searchParams } = useQueryParam();
  const navigate = useNavigate();
  const handleLogout = async() => {
    await TokenService.remove();
    dispatch(setIsAuthorized(false));
  };

  const handleCreateAnime = () => {
    navigate({ pathname: '/create', search: searchParams });
  };
  return (
    <div className={style['header']}>
      <div className={style['header__wrapper']}>
        <Link className={style['header__link']} to={'/'}>
          JSCamp 2022 - Anime Saritasa
        </Link>
        <Stack direction={'row'} gap={2}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
          Log out
          </Button>
          <Button variant="contained" color="warning" onClick={handleCreateAnime}>
            Create new anime
          </Button>
        </Stack>
      </div>
    </div>
  );
};
