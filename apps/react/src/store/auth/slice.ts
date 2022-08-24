import { HttpError, Login, User } from '@js-camp/core/models';
import { createSlice } from '@reduxjs/toolkit';

import { login, register } from './dispatchers';

import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorMessage(state) {
      state.error = undefined;
    },
  },
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
      })

      .addCase(register.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as HttpError<User>;
        state.isLoading = false;
        state.isAuth = false;
      }),
});

export const { clearErrorMessage } = authSlice.actions;
