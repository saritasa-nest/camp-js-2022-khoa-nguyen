import { createSlice } from '@reduxjs/toolkit';

import { addGenres } from './dispatchers';
import { entityAdapter, GenreState, initialState } from './state';

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(addGenres.fulfilled, (state, action) => {
      entityAdapter.addMany(state as GenreState, action.payload);
    }),
});
