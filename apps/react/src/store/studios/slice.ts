import { createSlice } from '@reduxjs/toolkit';

import { addStudios } from './dispatchers';
import { entityAdapter, initialState, StudioState } from './state';

export const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(addStudios.fulfilled, (state, action) => {
      entityAdapter.addMany(state as StudioState, action.payload);
    }),
});
