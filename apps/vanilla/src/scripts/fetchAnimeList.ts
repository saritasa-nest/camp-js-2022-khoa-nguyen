
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { appAxios } from '../configs';

/**
 * Generate for range of numbers.
 * @param limit Anime quantity per pages.
 * @param offset Anime offset.
 */
export async function asyncGetAnimeList(limit: number, offset: number): Promise<PaginationDto<AnimeDto>> {
  try {
    const response = await appAxios.get(`anime/anime/?limit=${limit}&offset=${offset}`);
    const result = await response.data;
    return result;
  } catch (errors: unknown) {
    throw new Error(`Failed to get anime list: ${errors}`);
  }
}
