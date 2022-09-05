import { AnimeQueryUrl } from '@js-camp/core/dtos/animeQuery.dto';
import { selectAnimeDetailById } from '@js-camp/react/store/animeDetail/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { Typography } from '@mui/material';

import { FC } from 'react';

import { useQueryParam } from '../../../../hooks';

import style from './AnimeDetail.module.css';

const INITIAL_ID = -1;

const getText = (text: string | undefined): string => {
  if (text == null || text === '') {
    return '--';
  }
  return text;
};

export const AnimeDetail: FC = () => {
  const { queryMethods } = useQueryParam<AnimeQueryUrl>();
  const animeInfo = useAppSelector(state =>
    selectAnimeDetailById(state, queryMethods.get('animeId') ?? INITIAL_ID));
  return (
    <div className={style['anime-detail']}>
      <Typography>English name: {getText(animeInfo?.titleEnglish)}</Typography>
      <Typography>Japanese name: {getText(animeInfo?.titleJapan)}</Typography>
      <Typography>Status: {getText(animeInfo?.status)}</Typography>
      <Typography>Type: {getText(animeInfo?.type)}</Typography>
    </div>
  );
};
