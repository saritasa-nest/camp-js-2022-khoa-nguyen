import { createAsyncThunk } from '@reduxjs/toolkit';

import { StudioService } from '../../api/services/studioService';

export const fetchStudiosList = createAsyncThunk(
  'studios/fetch',
  (param: string) => StudioService.fetchStudios(param),
);

export const createNewStudio = createAsyncThunk(
  'studios/create',
  (studioName: string) => StudioService.createStudio(studioName),
);
