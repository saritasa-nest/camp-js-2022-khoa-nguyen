import { AnimeDto, PaginationDto } from '@js-camp/core/dtos';
import { AnimeMapper, PaginationMapper } from '@js-camp/core/mappers';
import { Anime } from '@js-camp/core/models';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { http } from '../../api';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'anime/getAnimeList',
  async(param: string, { rejectWithValue }) => {
    try {
      return (await AnimeService.getAnimeList(param));
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const getNextAnimeList = createAsyncThunk(
  'anime/getAnimeListNext',
  async(url: string, { rejectWithValue }) => {
    try {
      const result = await http.get<PaginationDto<AnimeDto>>(url);
      return PaginationMapper.fromDto<AnimeDto, Anime>(result.data, AnimeMapper.fromDto);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
