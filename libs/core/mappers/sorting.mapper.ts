import { SortingDto } from '../dtos/sorting.dto';
import { Sorting } from '../models/sorting';

export namespace SortingMapper {

  /**
   * Maps dto to model.
   * @param sorting Page options.
   */
  export function toDto(sorting: Sorting): SortingDto {
    return {
      ordering: sorting.value,
    };
  }
}
