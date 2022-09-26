import { Studio } from '@js-camp/core/models';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addStudios = createAsyncThunk(
  'studios/add',
  (studios: readonly Studio[]) => studios,
);
