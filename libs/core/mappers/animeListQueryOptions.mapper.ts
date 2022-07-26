import { TypeDto } from '../dtos/anime.dto';
import { AnimeListQueryOptionsDto } from '../dtos/animeListQueryOptions.dto';
import { TypeModel } from '../models/anime';
import { AnimeListQueryOptions } from '../models/animeListQueryOptions';

export namespace AnimeListQueryOptionsMapper {
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
  export function toDto(options: AnimeListQueryOptions): AnimeListQueryOptionsDto {

    const type = options.type == null ? TypeDto.Default : (typeModelToDto[options.type] ?? TypeDto.Default);

    return {
      limit: options.limit,
      offset: options.offset,
      search: options.search == null ? '' : options.search,
      ordering: options.sorting.isAscending ? options.sorting.value : `-${options.sorting.value}`,
      type,
    };
  }
}
