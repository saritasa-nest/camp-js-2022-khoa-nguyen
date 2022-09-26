import { AnimeDetail } from '@js-camp/core/models';
import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { AnimeQuery } from '@js-camp/core/models/animeQuery';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'animeList/getAnimeList',
  async(param: AnimeQuery, { rejectWithValue }) => {
    try {
      return await AnimeService.getAnimeList(param);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const getNextAnimeList = createAsyncThunk(
  'animeList/getAnimeListNext',
  async(url: string, { rejectWithValue }) => {
    try {
      return await AnimeService.getNextAnimeList(url);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const deleteAnime = createAsyncThunk(
  'animeList/deleteAnime',
  async(id: AnimeDetail['id'], { rejectWithValue }) => {
    try {
      await AnimeService.deleteAnime(id);
      return id;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const editAnime = createAsyncThunk(
  'animeList/editAnime',
  async(
    { id, body }: { id: AnimeEdit['id']; body: AnimeEdit; },
    { rejectWithValue },
  ) => {
    try {
      return await AnimeService.editAnime(id, body);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const createAnime = createAsyncThunk(
  'animeList/createAnime',
  async(body: AnimeEdit, { rejectWithValue }) => {
    try {
      return await AnimeService.createAnime(body);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const postAnimePoster = createAsyncThunk(
  'animeList/postAnimePoster',
  (poster: File) => AnimeService.postAnimePoster(poster),
);
