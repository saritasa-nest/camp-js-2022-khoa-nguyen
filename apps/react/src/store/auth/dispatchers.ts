import { ErrorLoginDto, ErrorUserDto, HttpErrorDto } from '@js-camp/core/dtos';
import { ErrorLoginMapper, ErrorUserMapper, HttpErrorMapper } from '@js-camp/core/mappers';
import { ErrorLogin, ErrorUser, Login, User } from '@js-camp/core/models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthService } from '../../api/services/authService';

export const login = createAsyncThunk(
  'auth/login',
  async(loginInfo: Login, { rejectWithValue }) => {
    try {
      return await AuthService.login(loginInfo);
    } catch (error: unknown) {
      const errorDto = (error as AxiosError).response?.data as HttpErrorDto<ErrorLoginDto>;
      const errorModel = HttpErrorMapper.fromDto<ErrorLoginDto, ErrorLogin>(errorDto, ErrorLoginMapper.fromDto);
      return rejectWithValue(errorModel);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async(registerInfo: User, { rejectWithValue }) => {
    try {
      return await AuthService.register(registerInfo);
    } catch (error: unknown) {
      const errorDto = (error as AxiosError).response?.data as HttpErrorDto<ErrorUserDto>;
      const errorModel = HttpErrorMapper.fromDto<ErrorUserDto, ErrorUser>(errorDto, ErrorUserMapper.fromDto);
      return rejectWithValue(errorModel);
    }
  },
);
