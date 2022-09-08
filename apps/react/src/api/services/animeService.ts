import { AnimeDetailDto, AnimeDto, PaginationDto } from '@js-camp/core/dtos';
import {
  AnimeEditDto,
} from '@js-camp/core/dtos/animeEdit.dto';
import {
  AnimeDetailMapper,
  AnimeMapper,
  PaginationMapper,
} from '@js-camp/core/mappers';
import { AnimeEditMapper } from '@js-camp/core/mappers/animeEdit.mapper';
import { AnimeQueryMapper } from '@js-camp/core/mappers/animeQuery.mapper';
import { Anime, AnimeDetail, Pagination } from '@js-camp/core/models';
import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { AnimeQuery } from '@js-camp/core/models/animeQuery';
import { AxiosResponse } from 'axios';

import { http } from '..';

export namespace AnimeService {
  const ANIME_LIST_URL = 'anime/anime/';

  /**
   * Get anime pagination.
   * @param params Query params.
   */
  export async function getAnimeList(
    params: AnimeQuery,
  ): Promise<Pagination<Anime>> {
    const paramDto = AnimeQueryMapper.toDto(params);
    const result = await http.get<PaginationDto<AnimeDto>>(ANIME_LIST_URL, {
      params: paramDto,
    });
    return PaginationMapper.fromDto<AnimeDto, Anime>(
      result.data,
      AnimeMapper.fromDto,
    );
  }

  /**
   * Get anime detail.
   * @param id Id of anime.
   * @param type Type of query.
   */
  export async function getDetailAnime(
    id: AnimeDetail['id'],
    type: 'detail' | 'edit',
  ): Promise<AnimeDetail | AnimeEdit> {
    const result = await http.get<AnimeDetailDto | AnimeEditDto>(
      `${ANIME_LIST_URL}${id}/`,
    );
    if (type === 'detail') {
      return AnimeDetailMapper.fromDto(result.data as AnimeDetailDto);
    }
    return AnimeEditMapper.fromDto(result.data as AnimeEditDto);
  }

  /**
   * Delete anime.
   * @param id Id of anime.
   */
  export async function deleteAnime(
    id: AnimeDetail['id'],
  ): Promise<AxiosResponse> {
    const result = await http.delete<AxiosResponse>(`${ANIME_LIST_URL}${id}/`);
    return result.data;
  }

  /**
   * Edit anime.
   * @param id Id of anime.
   * @param body Body of edit.
   */
  export async function editAnime(
    id: AnimeEdit['id'],
    body: AnimeEdit,
  ): Promise<AnimeEdit> {
    const requestBodyDto = AnimeEditMapper.toDto(body);
    const result = await http.put<AnimeEditDto>(
      `${ANIME_LIST_URL}${id}/`,
      requestBodyDto,
    );
    return AnimeEditMapper.fromDto(result.data);
  }

  /**
   * Create anime.
   * @param id Id of anime.
   * @param body Body of create.
   */
  export async function createAnime(
    id: AnimeEdit['id'],
    body: AnimeEdit,
  ): Promise<AnimeEdit> {
    const requestBodyDto = AnimeEditMapper.toDto(body);
    const result = await http.post<AnimeEditDto>(
      `${ANIME_LIST_URL}${id}/`,
      requestBodyDto,
    );
    return AnimeEditMapper.fromDto(result.data);
  }
}
