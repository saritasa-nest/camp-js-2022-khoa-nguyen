import { AnimeDto } from '@js-camp/core/dtos';
import { AnimeMapper, PaginationMapper } from '@js-camp/core/mappers';
import { Anime } from '@js-camp/core/models';

import { http } from '..';

export namespace AnimeService {

  const ANIME_LIST_URL = 'anime/anime/';

  /**
   * Get anime pagination.
   * @param params Query params.
   */
  export async function getAnimeList(params: string) {
    const paginationDto = await http.get(ANIME_LIST_URL, { params: params !== '' ? params : undefined });
    return PaginationMapper.fromDto<AnimeDto, Anime>(paginationDto.data, AnimeMapper.fromDto);
  }
}
