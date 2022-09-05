import { Anime } from '@js-camp/core/models';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

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

export const AnimeItem: FC<Props> = ({ data }) => (
  <Card className={style['anime-item__wrapper']}>
    <CardContent className={style['anime-item']}>
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
