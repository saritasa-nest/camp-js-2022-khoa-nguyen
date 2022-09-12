import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'anime/getAnimeList',
  async(payload, { rejectWithValue }) => {
    try {
      return await AnimeService.getAnimeList();
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const getNextAnimeList = createAsyncThunk(
  'anime/getAnimeListNext',
  async(url: string, { rejectWithValue }) => {
    try {
      return await AnimeService.getNextAnimeList(url);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
