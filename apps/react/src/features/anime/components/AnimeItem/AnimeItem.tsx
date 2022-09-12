import { Anime } from '@js-camp/core/models';
import { Avatar, Card, CardContent, Typography } from '@mui/material';

import { FC } from 'react';

import { IMAGES } from '../../../../assets';

import style from './AnimeItem.module.css';

interface Props {

  /** Anime info. */
  readonly animeInfo: Anime;
}

const replaceEmptyValue = (text: string): string => {
  if (text == null) {
    return '--';
  }
  return text;
};

export const AnimeItem: FC<Props> = ({ animeInfo }) => (
  <Card className={style['anime-item__wrapper']}>
    <CardContent className={style['anime-item']}>
      {animeInfo.image == null && (
        <Avatar
          alt={animeInfo.titleEnglish}
          src={IMAGES.FallbackAvatar}
          className={style['anime-item__thumb']}
        />
      )}
      {animeInfo.image && (
        <Avatar
          alt={animeInfo.titleEnglish}
          src={animeInfo.image}
          className={style['anime-item__thumb']}
        />
      )}
      <div className={style['anime-item__content']}>
        <Typography>{replaceEmptyValue(animeInfo.titleJapan)}</Typography>
        <Typography>{replaceEmptyValue(animeInfo.titleEnglish)}</Typography>
        <Typography>Status: {replaceEmptyValue(animeInfo.status)}</Typography>
        <Typography>Type: {replaceEmptyValue(animeInfo.type)}</Typography>
      </div>
    </CardContent>
  </Card>
);
