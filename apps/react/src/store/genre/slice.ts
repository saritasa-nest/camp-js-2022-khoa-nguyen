import { createSlice } from '@reduxjs/toolkit';

import { addGenres, fetchGenres } from './dispatchers';
import { entityAdapter, initialState, GenreState } from './state';

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchGenres.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchGenres.fulfilled, (state, action) => {
      entityAdapter.setAll(state as GenreState, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchGenres.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(addGenres.fulfilled, (state, action) => {
      entityAdapter.addMany(state as GenreState, action.payload);
    }),
});
