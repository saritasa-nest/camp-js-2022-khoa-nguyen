import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { createAnime, deleteAnime, editAnime, getAnimeList, getNextAnimeList } from './dispatchers';

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
      })

      .addCase(deleteAnime.pending, state => {
        state.error = null;
        state.isLoadingDelete = true;
      })
      .addCase(deleteAnime.fulfilled, (state, { payload: id }) => {
        animeAdapter.removeOne(state as AnimeState, id);
        state.error = null;
        state.isLoadingDelete = false;
      })
      .addCase(deleteAnime.rejected, (state, action) => {
        if (action.error.message) {
          state.error = `Failed to delete anime due to error: ${action.error.message}`;
        }
        state.isLoadingDelete = false;
      })

      .addCase(editAnime.pending, state => {
        state.error = null;
      })
      .addCase(editAnime.fulfilled, (state, action) => {
        animeAdapter.setOne(state as AnimeState, action.payload);
        state.error = null;
      })
      .addCase(editAnime.rejected, (state, action) => {
        if (action.error.message) {
          state.error = `Failed to edit anime due to error: ${action.error.message}`;
        }
      })

      .addCase(createAnime.pending, state => {
        state.error = null;
      })
      .addCase(createAnime.fulfilled, (state, action) => {
        animeAdapter.addOne(state as AnimeState, action.payload);
        state.error = null;
      })
      .addCase(createAnime.rejected, (state, action) => {
        if (action.error.message) {
          state.error = `Failed to create anime due to error: ${action.error.message}`;
        }
      }),
});
