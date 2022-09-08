import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genreService';

export const fetchGenres = createAsyncThunk(
  'genres/fetch',
  (param: string) => GenresService.fetchGenres(param),
);
