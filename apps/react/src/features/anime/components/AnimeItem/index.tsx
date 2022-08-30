import { Anime } from '@js-camp/core/models';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import style from './AnimeItem.module.css';

interface Props {

  /** Anime info. */
  readonly data: Anime;
}

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
        <Typography>{data.titleJapan || '--'}</Typography>
        <Typography>{data.titleEnglish || '--'}</Typography>
        <Typography>Status: {data.status || '--'}</Typography>
        <Typography>Type: {data.type || '--'}</Typography>
      </div>
    </CardContent>
  </Card>
);
