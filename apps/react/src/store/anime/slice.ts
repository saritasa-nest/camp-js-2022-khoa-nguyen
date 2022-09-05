import { createSlice } from '@reduxjs/toolkit';

import { getAnimeList, getNextAnimeList } from './dispatchers';

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
        animeAdapter.setAll(state as AnimeState, action.payload.results);
        state.nextPageUrl = action.payload.next;
        state.totalItems = action.payload.count;
        state.isLoading = false;
      })
      .addCase(getAnimeList.rejected, state => {
        state.isLoading = false;
      })
      .addCase(getNextAnimeList.pending, state => {
        state.isLoadingNextPage = true;
      })
      .addCase(getNextAnimeList.rejected, state => {
        state.isLoadingNextPage = false;
      })
      .addCase(getNextAnimeList.fulfilled, (state, action) => {
        animeAdapter.addMany(state as AnimeState, action.payload.results);
        state.nextPageUrl = action.payload.next;
        state.totalItems = action.payload.count;
        state.isLoadingNextPage = false;
      }),
});
