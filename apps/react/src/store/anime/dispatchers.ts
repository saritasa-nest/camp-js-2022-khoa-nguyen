import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'anime/list',
  async(param: string, { rejectWithValue }) => {
    try {
      return (await AnimeService.getAnimeList(param)).results;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
