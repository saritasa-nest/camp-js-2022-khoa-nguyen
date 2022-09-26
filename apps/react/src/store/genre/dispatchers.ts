import { Genre } from '@js-camp/core/models/genre';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addGenres = createAsyncThunk(
  'genres/add',
  (genres: readonly Genre[]) => genres,
);
