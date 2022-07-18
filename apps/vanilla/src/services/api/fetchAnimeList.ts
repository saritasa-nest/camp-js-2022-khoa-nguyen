import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { PaginationOptionsMapper } from '@js-camp/core/mappers/paginationOptions.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';

import { appAxios } from '../../configs';

import { throwError } from '../../utils';

/**
 * Fetch anime data with corresponding limit, offset and ordering.
 * @param options Options settings of pagination.
 */
export async function fetchAnimeList(options: PaginationOptions): Promise<Pagination<Anime> | null> {
  try {
    const params = PaginationOptionsMapper.toDto(options);
    const result = await appAxios.get<PaginationDto<AnimeDto>>(`anime/anime/`,
      {
        params,
      });
    return PaginationMapper.fromDto<AnimeDto, Anime>(result.data, AnimeMapper.fromDto);
  } catch (error: unknown) {
    throwError(error, 'Unable to get anime data');
    return null;
  }
}
