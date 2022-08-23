import { Login } from '@js-camp/core/models';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '../../api/services/authService';

export const login = createAsyncThunk(
  'auth/login',
  async(loginInfo: Login, { rejectWithValue }) => {
    try {
      return await AuthService.login(loginInfo);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
