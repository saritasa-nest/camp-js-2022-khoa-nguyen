import { Anime, AnimeDetail } from '@js-camp/core/models';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { useQueryParam } from '../../../../hooks';

import { IMAGES } from '../../../../assets';

import style from './AnimeItem.module.css';
interface Props {

  /** Anime info. */
  readonly data: Anime;
}

const getText = (text: string): string => {
  if (text == null) {
    return '--';
  }
  return text;
};

export const AnimeItem: FC<Props> = ({ data }) => {
  const { searchParams } = useQueryParam();
  const navigate = useNavigate();
  const handleShowAnimeDetail = (id: AnimeDetail['id']) => () => {
    navigate({ pathname: `/detail/${id}`, search: searchParams });
  };
  return (
    <Card
      className={style['anime-item__wrapper']}
      onClick={handleShowAnimeDetail(data.id)}
    >
      <CardContent className={style['anime-item']}>
        {data.image == null && (
          <Avatar
            alt={data.titleEnglish}
            src={IMAGES.FallbackAvatar}
            className={style['anime-item__thumb']}
          />
        )}
        {data.image && (
          <Avatar
            alt={data.titleEnglish}
            src={data.image}
            className={style['anime-item__thumb']}
          />
        )}
        <div className={style['anime-item__content']}>
          <Typography>{getText(data.titleJapan)}</Typography>
          <Typography>{getText(data.titleEnglish)}</Typography>
          <Typography>Status: {getText(data.status)}</Typography>
          <Typography>Type: {getText(data.type)}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
