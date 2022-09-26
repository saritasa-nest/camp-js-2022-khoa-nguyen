import { Anime } from '@js-camp/core/models';
import { deleteAnime } from '@js-camp/react/store/animeList/dispatchers';
import {
  selectErrorDelete,
  setIsDeleteAnimeLoading,
} from '@js-camp/react/store/animeList/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Delete, Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import classNames from 'classnames';
import { useSnackbar } from 'notistack';
import { FC, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { TextService } from '../../../../api/services/textService';
import { IMAGES } from '../../../../assets';
import { useQueryParam } from '../../../../hooks';

import style from './AnimeItem.module.css';
import { AnimePopperDelete } from './AnimePopperDelete';
interface Props {

  /** Anime info. */
  readonly animeInfo: Anime;
}

export const AnimeItem: FC<Props> = ({ animeInfo }) => {
  const { searchParams } = useQueryParam();
  const { id: currentAnime } = useParams();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState<number>();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const handleActiveNavLink = ({ isActive }: { isActive: boolean; }) =>
    classNames(
      style['anime-item'],
      (isActive || String(animeInfo.id) === currentAnime) &&
        style['anime-item_active'],
    );

  const errorDelete = useAppSelector(selectErrorDelete);
  const isLoading = useAppSelector(setIsDeleteAnimeLoading);
  const [isOpenPopperDelete, setIsOpenPopperDelete] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleDeleteAnime = async() => {
    setCurrentId(animeInfo.id);
    setIsOpenPopperDelete(false);
    await dispatch(deleteAnime(animeInfo.id));
    if (errorDelete != null) {
      enqueueSnackbar(errorDelete, { variant: 'error' });
    } else {
      enqueueSnackbar(`Delete anime ${animeInfo.titleEnglish} successfully!`, {
        variant: 'success',
      });
      if (currentAnime === String(animeInfo.id)) {
        navigate({ pathname: '/', search: searchParams });
      }
    }
  };

  const handleEditAnime = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    navigate({ pathname: `/edit/${animeInfo.id}`, search: searchParams });
  };

  const handleToggle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsOpenPopperDelete(prevOpen => !prevOpen);
  };

  const handleClose = () => {
    setIsOpenPopperDelete(false);
  };

  return (
    <NavLink
      className={handleActiveNavLink}
      to={`/detail/${animeInfo.id}?${searchParams}`}
    >
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
      <Stack className={style['anime-item__content']}>
        <Typography>
          {TextService.replaceEmptyValue(animeInfo.titleEnglish)}
        </Typography>
        <Typography>
          Status: {TextService.replaceEmptyValue(animeInfo.status)}
        </Typography>
        <Typography>
          Type: {TextService.replaceEmptyValue(animeInfo.type)}
        </Typography>
      </Stack>

      <Stack>
        <LoadingButton
          loading={currentId === animeInfo.id && isLoading}
          ref={anchorRef}
          id="composition-button"
          aria-controls={isOpenPopperDelete ? 'composition-menu' : undefined}
          aria-expanded={isOpenPopperDelete ? 'true' : undefined}
          aria-haspopup="true"
          color="secondary"
          onClick={handleToggle}
        >
          <Delete />
        </LoadingButton>
        <AnimePopperDelete
          isOpen={isOpenPopperDelete}
          anchorEl={anchorRef.current}
          onAction={handleDeleteAnime}
          onClose={handleClose}
        />
        <LoadingButton color="secondary" onClick={handleEditAnime}>
          <Edit />
        </LoadingButton>
      </Stack>
    </NavLink>
  );
};
