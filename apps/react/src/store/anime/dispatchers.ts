import { AnimeDetail } from '@js-camp/core/models';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';
import { addGenres } from '../genre/dispatchers';
import { addStudios } from '../studios/dispatchers';

export const getAnimeDetail = createAsyncThunk(
  'anime/getDetail',
  async(
    { id, type = 'detail' }: { id: AnimeDetail['id']; type?: 'detail' | 'edit'; },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const anime = await AnimeService.getDetailAnime(id, type);
      dispatch(addGenres(anime.genres));
      dispatch(addStudios(anime.studios));
      return anime;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
