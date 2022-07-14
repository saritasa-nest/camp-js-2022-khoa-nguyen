
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { PaginationOptionsMapper } from '@js-camp/core/mappers/paginationOptions.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';

import { appAxios } from '../configs';

/**
 * Fetch anime data with corresponding limit, offset and ordering.
 * @param options Options settings of pagination.
 */
export async function fetchAnimeList(options: PaginationOptions): Promise<Pagination<Anime>> {
  try {
    const optionsDto = PaginationOptionsMapper.toDto(options);
    const result = await appAxios.get<PaginationDto<AnimeDto>>(`anime/anime/`,
      {
        params: {
          limit: optionsDto.limit,
          offset: optionsDto.offset,
          ordering: optionsDto.ordering,
          type: optionsDto.type,
        },
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
