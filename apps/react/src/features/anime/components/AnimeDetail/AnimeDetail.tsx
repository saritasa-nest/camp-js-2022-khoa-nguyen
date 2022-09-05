import { selectAnimeDetailById } from '@js-camp/react/store/animeDetail/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { Typography } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import style from './AnimeDetail.module.css';

const INITIAL_ID = -1;

export const AnimeDetail: FC = () => {
  const { id: currentAnimeId } = useParams();
  const animeInfo = useAppSelector(state =>
    selectAnimeDetailById(state, currentAnimeId ?? INITIAL_ID));
  return (
    <div className={style['anime-detail']}>
      <Typography>{animeInfo?.titleEnglish}</Typography>
      <Typography>{animeInfo?.titleJapan}</Typography>
      <Typography>{animeInfo?.status}</Typography>
      <Typography>{animeInfo?.titleEnglish}</Typography>
    </div>
  );
};
