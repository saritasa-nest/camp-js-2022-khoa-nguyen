import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { getAnimeDetail } from './dispatchers';

import { AnimeDetailsState, entityAdapter, initialState } from './state';

export const animeSlice = createSlice({
  name: 'animeDetail',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAnimeDetail.pending, state => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAnimeDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload !== null) {
          entityAdapter.setOne(state as AnimeDetailsState, action.payload);
        }
      })
      .addCase(getAnimeDetail.rejected, (state, action) => {
        if (action.payload instanceof AxiosError) {
          if (action.payload.response?.status !== 401) {
            state.isLoading = false;
            return;
          }
          state.isLoading = true;
          return;
        }
        state.isLoading = false;
      }),
});
