import { AnimeDto, PaginationDto } from '@js-camp/core/dtos';
import { AnimeMapper, PaginationMapper } from '@js-camp/core/mappers';
import { Anime, AnimeDetail } from '@js-camp/core/models';
import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { AnimeQuery } from '@js-camp/core/models/animeQuery';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { http } from '../../api';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'anime/getAnimeList',
  async(param: AnimeQuery, { rejectWithValue }) => {
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

export const deleteAnime = createAsyncThunk(
  'anime/deleteAnime',
  async(id: AnimeDetail['id'], { rejectWithValue }) => {
    try {
      await AnimeService.deleteAnime(id);
      return id;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const editAnime = createAsyncThunk(
  'anime/deleteAnime',
  async({ id, body }: {id: AnimeEdit['id']; body: AnimeEdit;}, { rejectWithValue }) => {
    try {
      return await AnimeService.editAnime(id, body);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
