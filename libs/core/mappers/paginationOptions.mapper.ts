import { PaginationOptionsDto } from '../dtos/paginationOptions.dto';
import { TypeDto, TypeModel } from '../enum';
import { PaginationOptions } from '../models/paginationOptions';

export namespace PaginationOptionsMapper {
  const typeModelToDto: Readonly<Record<TypeModel, TypeDto>> = {
    [TypeModel.Movie]: TypeDto.Movie,
    [TypeModel.Ona]: TypeDto.Ona,
    [TypeModel.Ova]: TypeDto.Ova,
    [TypeModel.Special]: TypeDto.Special,
    [TypeModel.Music]: TypeDto.Music,
    [TypeModel.Tv]: TypeDto.Tv,
    [TypeModel.Default]: TypeDto.Default,
  };

  /**
   * Maps dto to model.
   * @param options Page options.
   */
  export function toDto(options: PaginationOptions): PaginationOptionsDto {

    const type = typeModelToDto[options.type] ?? TypeDto.Default;

    return {
      limit: options.limit,
      offset: options.offset,
      search: options.search,
      ordering: options.sorting.isAscending ? options.sorting.value : `-${options.sorting.value}`,
      type,
    };
  }
}
