import { AnimeQuery } from '@js-camp/core/models/animeQuery';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'anime/getAnimeList',
  async(param: AnimeQuery, { rejectWithValue }) => {
    try {
      return await AnimeService.getAnimeList(param);
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
