import { Anime } from '@js-camp/core/models';
import { Delete, Edit } from '@mui/icons-material';
import { Avatar, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Stack } from '@mui/system';

import classNames from 'classnames';

import { IMAGES } from '../../../../assets';
import { useQueryParam } from '../../../../hooks';

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

const handleActiveNavLink = ({ isActive }: { isActive: boolean; }) =>
  classNames(style['anime-item'], isActive && style['anime-item_active']);

export const AnimeItem: FC<Props> = ({ data }) => {
  const { searchParams } = useQueryParam();

  const handleDeleteAnime = () => {
    // 123
  };
  return (
    <NavLink
      className={handleActiveNavLink}
      to={`/detail/${data.id}/${searchParams}`}
    >
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
      <Stack className={style['anime-item__content']}>
        <Typography>{getText(data.titleJapan)}</Typography>
        <Typography>{getText(data.titleEnglish)}</Typography>
        <Typography>Status: {getText(data.status)}</Typography>
        <Typography>Type: {getText(data.type)}</Typography>
      </Stack>

      <Stack>
        <IconButton onClick={handleDeleteAnime}>
          <Delete />
        </IconButton>
        <IconButton>
          <Edit />
        </IconButton>
      </Stack>
    </NavLink>
  );
};
