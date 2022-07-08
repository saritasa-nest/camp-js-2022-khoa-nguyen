
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { appAxios } from '../configs';
import { PaginationOptions } from '../interface/paginationInterface';

// /**
//  * Fetch anime data with corresponding limit, offset and ordering.
//  * @param limit Anime quantity per pages.
//  * @param offset Anime offset.
//  * @param ordering Anime ordering.
//  */
// export async function fetchAnimeList(limit: number, offset: number, ordering: string): Promise<Pagination<Anime>> {
//   try {
//     const result = await appAxios.get<PaginationDto<AnimeDto>>(`anime/anime/`, { params: { limit, offset, ordering } });
//     return PaginationMapper.fromDto<AnimeDto, Anime>(result.data, AnimeMapper.fromDto);
//   } catch (errors: unknown) {
//     throw new Error(`Failed to get anime list: ${errors as string}`);
//   }
// }

/**
 * Fetch anime data with corresponding limit, offset and ordering.
 * @param options Options settings of pagination.
 */
export async function fetchAnimeList(options: PaginationOptions): Promise<Pagination<Anime>> {
  try {
    const result = await appAxios.get<PaginationDto<AnimeDto>>(`anime/anime/`,
      { params: { limit: options.limit, offset: options.offset, ordering: options.sorting.value } });
    return PaginationMapper.fromDto<AnimeDto, Anime>(result.data, AnimeMapper.fromDto);
  } catch (errors: unknown) {
    throw new Error(`Failed to get anime list: ${errors as string}`);
  }
}
