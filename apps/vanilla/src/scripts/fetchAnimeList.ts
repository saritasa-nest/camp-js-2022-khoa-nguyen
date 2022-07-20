
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { animeListQueryOptionsMapper } from '@js-camp/core/mappers/AnimeListQueryOptions';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { animeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';

import { appAxios } from '../configs';

/**
 * Fetch anime data with corresponding limit, offset and ordering.
 * @param options Options settings of pagination.
 */
export async function fetchAnimeList(options: animeListQueryOptions): Promise<Pagination<Anime>> {
  try {
    const params = animeListQueryOptionsMapper.toDto(options);
    const result = await appAxios.get<PaginationDto<AnimeDto>>(`anime/anime/`,
      {
        params,
      });
    return PaginationMapper.fromDto<AnimeDto, Anime>(result.data, AnimeMapper.fromDto);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to get anime list: ${error.message}`);
    } else {
      throw new Error('Unexpected error!');
    }
  }
}
