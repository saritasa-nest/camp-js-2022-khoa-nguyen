import { PaginationOptionsDto } from '../dtos/paginationOptions.dto';
import { PaginationOptions } from '../models/paginationOptions';

export namespace PaginationOptionsMapper {

  /**
   * Maps dto to model.
   * @param options Page options.
   */
  export function toDto(options: PaginationOptions): PaginationOptionsDto {

    return {
      limit: options.limit,
      offset: options.offset,
      ordering: options.sorting.isAscending ? options.sorting.value : `-${options.sorting.value}`,
    };
  }
}
