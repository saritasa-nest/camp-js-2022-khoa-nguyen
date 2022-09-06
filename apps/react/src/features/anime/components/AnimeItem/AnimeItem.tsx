import { Anime } from '@js-camp/core/models';
import { Delete, Edit } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/system';
import classNames from 'classnames';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { deleteAnime } from '@js-camp/react/store/anime/dispatchers';
import { getAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import {
  selectErrorDelete,
  setIsDeleteAnimeLoading,
} from '@js-camp/react/store/anime/selectors';
import { LoadingButton } from '@mui/lab';

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
  const { searchParams, currentQueryParams } = useQueryParam();
  const { id: currentAnime } = useParams();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState<number>();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const errorDelete = useAppSelector(selectErrorDelete);
  const isLoading = useAppSelector(setIsDeleteAnimeLoading);

  const handleDeleteAnime = async(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setCurrentId(data.id);
    await dispatch(deleteAnime(data.id));
    if (errorDelete != null) {
      enqueueSnackbar(errorDelete, { variant: 'error' });
    } else {
      enqueueSnackbar(`Delete anime ${data.titleEnglish} successfully!`, {
        variant: 'success',
      });
      if (currentAnime === String(data.id)) {
        navigate({ pathname: '/', search: searchParams });
      }
    }
    await dispatch(getAnimeList(currentQueryParams));
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
        <LoadingButton
          loading={currentId === data.id && isLoading}
          color="secondary"
          onClick={handleDeleteAnime}
        >
          <Delete />
        </LoadingButton>
        <LoadingButton color="secondary">
          <Edit />
        </LoadingButton>
      </Stack>
    </NavLink>
  );
};
