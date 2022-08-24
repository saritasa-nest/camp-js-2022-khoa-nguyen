import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'auth/login',
  async(param: string, { rejectWithValue }) => {
    try {
      return await AnimeService.getAnimeList(param);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
