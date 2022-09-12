import { Anime, AnimeDetail } from '@js-camp/core/models';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { useQueryParam } from '../../../../hooks';

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

export const AnimeItem: FC<Props> = ({ animeInfo }) => {
  const { searchParams } = useQueryParam();
  const navigate = useNavigate();
  const handleShowAnimeDetail = (id: AnimeDetail['id']) => () => {
    navigate({ pathname: `/detail/${id}`, search: searchParams });
  };
  return (
    <Card
      className={style['anime-item__wrapper']}
      onClick={handleShowAnimeDetail(animeInfo.id)}
    >
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
};
