import { AnimeListQueryOptionsDto } from '../dtos/animeListQueryOptions';
import { AnimeListQueryOptions } from '../models/animeListQueryOptions';

export namespace AnimeListQueryOptionsMapper {

  /**
   * Maps dto to model.
   * @param options Page options.
   */
  export function toDto(options: AnimeListQueryOptions): AnimeListQueryOptionsDto {

    return {
      limit: options.limit,
      offset: options.offset,
      ordering: options.sorting.isAscending ? options.sorting.value : `-${options.sorting.value}`,
    };
  }
}
