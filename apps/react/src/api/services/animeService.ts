import { AnimeDetailDto, AnimeDto, PaginationDto } from '@js-camp/core/dtos';
import {
  AnimeDetailMapper,
  AnimeMapper,
  PaginationMapper,
} from '@js-camp/core/mappers';
import { AnimeQueryMapper } from '@js-camp/core/mappers/animeQuery.mapper';
import { Anime, AnimeDetail, Pagination } from '@js-camp/core/models';
import { AnimeQuery } from '@js-camp/core/models/animeQuery';

import { http } from '..';

export namespace AnimeService {
  const ANIME_LIST_URL = 'anime/anime/';

  /**
   * Get anime pagination.
   * @param params Param of anime list to query.
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
   */
  export async function getDetailAnime(
    id: AnimeDetail['id'],
  ): Promise<AnimeDetail> {
    const result = await http.get<AnimeDetailDto>(`${ANIME_LIST_URL}${id}/`);
    return AnimeDetailMapper.fromDto(result.data);
  }

  /**
   * Get anime pagination.
   * @param nextPageAnimeUrl Next page url of anime list.
   */
  export async function getNextAnimeList(
    nextPageAnimeUrl: string,
  ): Promise<Pagination<Anime>> {
    const result = await http.get<PaginationDto<AnimeDto>>(nextPageAnimeUrl);
    return PaginationMapper.fromDto<AnimeDto, Anime>(
      result.data,
      AnimeMapper.fromDto,
    );
  }
}
