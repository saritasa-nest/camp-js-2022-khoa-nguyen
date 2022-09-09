import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { getAnimeDetail } from '@js-camp/react/store/anime/dispatchers';
import {
  selectAnimeDetailById,
  selectIsAnimeDetailLoading,
} from '@js-camp/react/store/anime/selectors';
import { editAnime } from '@js-camp/react/store/animeList/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Typography } from '@mui/material';

import { useSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useQueryParam } from '../../../../hooks';

import { AnimeEditCreateForm } from '../../components/AnimeEditCreateForm';
import {
  AnimeDetailLoading,
  AnimeDetailNoData,
} from '../AnimeDetailPage/AnimeOtherLayout';

const INITIAL_ANIME_ID = '-1';

export const AnimeEditPage: FC = () => {
  const { id: currentAnimeId } = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsAnimeDetailLoading);
  const animeInfo = useAppSelector(state =>
    selectAnimeDetailById(state, currentAnimeId ?? INITIAL_ANIME_ID));

  const { searchParams } = useQueryParam();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentAnimeId != null && currentAnimeId !== INITIAL_ANIME_ID) {
      dispatch(getAnimeDetail({ id: Number(currentAnimeId), type: 'edit' }));
    }
  }, [currentAnimeId]);

  const handleSubmit = async(animeEditModel: AnimeEdit) => {
    const data = animeInfo as AnimeEdit;
    const result = await dispatch(
      editAnime({
        id: data.id,
        body: animeEditModel,
      }),
    );
    if (result.payload instanceof AnimeEdit) {
      navigate({
        pathname: `/detail/${result.payload.id}/`,
        search: searchParams,
      });
      enqueueSnackbar(`Edit anime ${data.titleEnglish} successfully!`, {
        variant: 'success',
      });
      return;
    }
    enqueueSnackbar(`Failed to edit anime ${data.titleEnglish}!`, {
      variant: 'error',
    });
  };

  if (isLoading) {
    return <AnimeDetailLoading />;
  }

  if (animeInfo == null) {
    return <AnimeDetailNoData />;
  }

  return (
    <>
      <Typography variant="h1" textAlign="center" marginBottom="30px">
        EDIT ANIME
      </Typography>
      <AnimeEditCreateForm
        animeInfo={animeInfo as AnimeEdit}
        onFormSubmit={handleSubmit}
      />
    </>
  );
};
