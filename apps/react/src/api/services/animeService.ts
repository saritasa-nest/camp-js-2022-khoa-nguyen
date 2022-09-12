import { AnimeDto, PaginationDto } from '@js-camp/core/dtos';
import { AnimeMapper, PaginationMapper } from '@js-camp/core/mappers';
import { Anime, Pagination } from '@js-camp/core/models';

import { http } from '..';

export namespace AnimeService {
  const ANIME_LIST_URL = 'anime/anime/';

  /** Get anime pagination. */
  export async function getAnimeList(): Promise<Pagination<Anime>> {
    const paginationDto = await http.get<PaginationDto<AnimeDto>>(
      ANIME_LIST_URL,
    );
    return PaginationMapper.fromDto<AnimeDto, Anime>(
      paginationDto.data,
      AnimeMapper.fromDto,
    );
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
