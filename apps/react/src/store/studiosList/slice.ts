import { createSlice } from '@reduxjs/toolkit';

import { createNewStudio, fetchStudiosList } from './dispatchers';
import { entityAdapter, initialState, StudioState } from './state';

export const studiosListSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchStudiosList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchStudiosList.fulfilled, (state, action) => {
      entityAdapter.setAll(state as StudioState, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchStudiosList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(createNewStudio.pending, state => {
      state.isCreateStudioLoading = true;
    })
    .addCase(createNewStudio.fulfilled, (state, action) => {
      entityAdapter.addOne(state as StudioState, action.payload);
      state.isCreateStudioLoading = false;
    })
    .addCase(createNewStudio.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isCreateStudioLoading = false;
    }),
});
