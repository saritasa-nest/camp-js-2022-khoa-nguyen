import { createSlice } from '@reduxjs/toolkit';

import { getAnimeDetail } from './dispatchers';

import { AnimeDetailsState, entityAdapter, initialState } from './state';

export const animeDetailsSlice = createSlice({
  name: 'animeDetails',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(getAnimeDetail.pending, state => {
      state.error = null;
      state.isLoading = true;
    })
    .addCase(getAnimeDetail.fulfilled, (state, action) => {
      if (action.payload !== null) {
        entityAdapter.setOne(state as AnimeDetailsState, action.payload);
      }
      state.isLoading = false;
    })
    .addCase(getAnimeDetail.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),

});
