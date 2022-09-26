import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genreService';

export const fetchGenresList = createAsyncThunk(
  'genres/fetch',
  (param: string) => GenresService.fetchGenres(param),
);

export const createNewGenre = createAsyncThunk(
  'genres/create',
  (genreName: string) => GenresService.createGenre(genreName),
);
