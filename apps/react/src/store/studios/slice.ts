import { createSlice } from '@reduxjs/toolkit';

import { addStudios, fetchStudios } from './dispatchers';
import { entityAdapter, initialState, StudioState } from './state';

export const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchStudios.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchStudios.fulfilled, (state, action) => {
      entityAdapter.setAll(state as StudioState, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchStudios.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(addStudios.fulfilled, (state, action) => {
      entityAdapter.addMany(state as StudioState, action.payload);
    }),
});
