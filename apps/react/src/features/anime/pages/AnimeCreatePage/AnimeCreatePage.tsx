import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { createAnime } from '@js-camp/react/store/animeList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { Typography } from '@mui/material';

import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryParam } from '../../../../hooks';

import { AnimeEditCreateForm } from '../../components/AnimeEditCreateForm';

export const AnimeCreatePage: FC = () => {
  const dispatch = useAppDispatch();
  const { searchParams } = useQueryParam();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async(animeEditModel: AnimeEdit) => {
    const result = await dispatch(createAnime(animeEditModel));
    if (result.payload instanceof AnimeEdit) {
      navigate({
        pathname: `/detail/${result.payload.id}/`,
        search: searchParams,
      });
      enqueueSnackbar(
        `Create anime ${result.payload.titleEnglish} successfully!`,
        {
          variant: 'success',
        },
      );
      return;
    }
    enqueueSnackbar(`Failed to create anime `, {
      variant: 'error',
    });
  };
  return (
    <>
      <Typography variant='h1' textAlign="center" marginBottom="30px">CREATE NEW ANIME</Typography>
      <AnimeEditCreateForm onFormSubmit={handleSubmit} />
    </>
  );
};
