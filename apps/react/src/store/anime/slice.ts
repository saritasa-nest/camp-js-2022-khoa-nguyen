import { createSlice } from '@reduxjs/toolkit';

import { getAnimeList } from './dispatchers';

import { animeAdapter, AnimeState, initialState } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAnimeList.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAnimeList.fulfilled, (state, action) => {
        animeAdapter.setAll(state as AnimeState, action.payload);
        state.isLoading = false;
      })
      .addCase(getAnimeList.rejected, state => {
        state.isLoading = false;
      }),
});
