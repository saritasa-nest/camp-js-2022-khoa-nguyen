import { createSlice } from '@reduxjs/toolkit';

import { createNewGenre, fetchGenres } from './dispatchers';
import { entityAdapter, GenreState, initialState } from './state';

export const genresListSlice = createSlice({
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

    .addCase(createNewGenre.pending, state => {
      state.isCreateGenreLoading = true;
    })
    .addCase(createNewGenre.fulfilled, (state, action) => {
      entityAdapter.addOne(state as GenreState, action.payload);
      state.isCreateGenreLoading = false;
    })
    .addCase(createNewGenre.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isCreateGenreLoading = false;
    }),
});
