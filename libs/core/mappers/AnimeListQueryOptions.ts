import { animeListQueryOptionsDto } from '../dtos/animeListQueryOptions.dto';
import { animeListQueryOptions } from '../models/animeListQueryOptions';

export namespace animeListQueryOptionsMapper {

  /**
   * Maps dto to model.
   * @param options Page options.
   */
  export function toDto(options: animeListQueryOptions): animeListQueryOptionsDto {

    return {
      limit: options.limit,
      offset: options.offset,
      search: options.search,
      ordering: options.sorting.isAscending ? options.sorting.value : `-${options.sorting.value}`,
    };
  }
}
