import { HttpError } from '@js-camp/core/models';
import { createSlice } from '@reduxjs/toolkit';

import { login, register } from './dispatchers';

import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorMessage(state) {
      state.error = null;
    },
    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload;
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
        state.isAuthorized = true;
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload instanceof HttpError) {
          state.error = action.payload;
        }
        state.isLoading = false;
        state.isAuthorized = false;
      })

      .addCase(register.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoading = false;
        state.isAuthorized = true;
      })
      .addCase(register.rejected, (state, action) => {
        if (action.payload instanceof HttpError) {
          state.error = action.payload;
        }
        state.isLoading = false;
        state.isAuthorized = false;
      }),
});

export const { clearErrorMessage, setIsAuthorized } = authSlice.actions;
