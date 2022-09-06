import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { getAnimeList, getNextAnimeList } from './dispatchers';

import { animeAdapter, AnimeState, initialState } from './state';

export const animeListSlice = createSlice({
  name: 'animeList',
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
      .addCase(getAnimeList.rejected, (state, action) => {
        if (action.payload instanceof AxiosError) {
          if (action.payload.response?.status !== 401) {
            state.isLoading = false;
            return;
          }
          state.isLoading = true;
          return;
        }
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
