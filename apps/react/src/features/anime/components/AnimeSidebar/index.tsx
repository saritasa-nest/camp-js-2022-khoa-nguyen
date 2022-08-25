import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { selectAmineList, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { ListItem } from '@mui/material';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Loading } from '../../../../components';

import { AnimeItem } from '../AnimeItem';

import style from './AnimeSidebar.module.css';

export const AnimeSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useSelector(selectAmineList);
  const isLoading = useAppSelector(selectIsAnimeLoading);

  useEffect(() => {
    dispatch(getAnimeList(''));
  }, []);

   if (isLoading) {
    return <Loading/>;
  }
  return (
    <ListItem className={style['anime-sidebar']}>
      {animeList?.map((item, index) => (
        <AnimeItem key={index} data={item} />
      ))}
    </ListItem>
  );
};
