import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { selectAmineList } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch } from '@js-camp/react/store/store';
import { ListItem } from '@mui/material';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AnimeItem } from '../AnimeItem';

import style from './AnimeSidebar.module.css';

export const AnimeSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useSelector(selectAmineList);

  useEffect(() => {
    dispatch(getAnimeList(''));
  }, []);
  return (
    <ListItem className={style['anime-sidebar']}>
      {animeList?.map((item, index) => (
        <AnimeItem key={index} data={item} />
      ))}
    </ListItem>
  );
};
