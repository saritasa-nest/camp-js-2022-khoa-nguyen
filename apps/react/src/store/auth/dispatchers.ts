import { HttpError, Login, User } from '@js-camp/core/models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthService } from '../../api/services/authService';

export const login = createAsyncThunk(
  'auth/login',
  async(loginInfo: Login, { rejectWithValue }) => {
    try {
      return await AuthService.login(loginInfo);
    } catch (error: unknown) {
      const errorReturn = (error as AxiosError).response?.data as HttpError<Login>;
      return rejectWithValue(new HttpError<Login>(errorReturn));
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async(registerInfo: User, { rejectWithValue }) => {
    try {
      return await AuthService.register(registerInfo);
    } catch (error: unknown) {
      const errorReturn = (error as AxiosError).response?.data as HttpError<User>;
      return rejectWithValue(new HttpError<User>(errorReturn));
    }
  },
);
