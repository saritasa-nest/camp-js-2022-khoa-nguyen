import { PaginationOptionsDto } from '../dtos/paginationOptions.dto';
import { TypeDto, TypeModel } from '../enum';
import { PaginationOptions } from '../models/paginationOptions';

export namespace PaginationOptionsMapper {
  const typeModelToDto: Readonly<Record<TypeModel, TypeDto>> = {
    [TypeModel.Movie]: TypeDto.MOVIE,
    [TypeModel.Ona]: TypeDto.ONA,
    [TypeModel.Ova]: TypeDto.OVA,
    [TypeModel.Special]: TypeDto.SPECIAL,
    [TypeModel.Music]: TypeDto.MUSIC,
    [TypeModel.Tv]: TypeDto.TV,
    [TypeModel.Default]: TypeDto.DEFAULT,
  };

  /**
   * Maps dto to model.
   * @param options Page options.
   */
  export function toDto(options: PaginationOptions): PaginationOptionsDto {

    const type = typeModelToDto[options.type] ?? TypeDto.DEFAULT;

    return {
      limit: options.limit,
      offset: options.offset,
      search: options.search,
      ordering: options.sorting.isAscending ? options.sorting.value : `-${options.sorting.value}`,
      type,
    };
  }
}
