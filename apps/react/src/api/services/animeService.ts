import { AnimeDto } from '@js-camp/core/dtos';
import { AnimeMapper, PaginationMapper } from '@js-camp/core/mappers';
import { AnimeQueryMapper } from '@js-camp/core/mappers/animeQuery.mapper';
import { Anime, Pagination } from '@js-camp/core/models';
import { AnimeQuery } from '@js-camp/core/models/animeQuery';

import { http } from '..';

export namespace AnimeService {

  const ANIME_LIST_URL = 'anime/anime/';

  /**
   * Get anime pagination.
   * @param params Query params.
   */
  export async function getAnimeList(params: AnimeQuery): Promise<Pagination<Anime>> {
    const paramDto = AnimeQueryMapper.toDto(params);
    const paginationDto = await http.get(ANIME_LIST_URL, { params: paramDto });
    return PaginationMapper.fromDto<AnimeDto, Anime>(paginationDto.data, AnimeMapper.fromDto);
  }
}
