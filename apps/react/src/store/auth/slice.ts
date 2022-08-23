import { HttpError, Login } from '@js-camp/core/models';
import { createSlice } from '@reduxjs/toolkit';

import { login } from './dispatchers';

import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(login.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as HttpError<Login>;
        state.isLoading = false;
        state.isAuth = false;
      }),
});
