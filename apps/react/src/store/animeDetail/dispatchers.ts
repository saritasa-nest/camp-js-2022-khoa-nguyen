import { AnimeDetail } from '@js-camp/core/models';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeDetail = createAsyncThunk(
  'anime/getDetail',
  async(id: AnimeDetail['id'], { rejectWithValue }) => {
    try {
      return await AnimeService.getDetailAnime(id);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
