import { AnimeQueryDto, SortingQueryDto } from '../dtos/animeQuery.dto';
import { AnimeQuery, OrderingQuery, SortingQuery } from '../models/animeQuery';

import { AnimeMapper } from './anime.mapper';

import { AnimeListQueryOptionsMapper } from './animeListQueryOptions.mapper';

export namespace SortingMapper {
  export const sortingModelToSortingDto: Readonly<Record<SortingQuery, SortingQueryDto>> = {
    [SortingQuery.Status]: SortingQueryDto.Status,
    [SortingQuery.TitleEng]: SortingQueryDto.TitleEng,
  };

  export const sortingDtoToSortingModel: Readonly<Record<SortingQueryDto, SortingQuery>> = {
    [SortingQueryDto.Status]: SortingQuery.Status,
    [SortingQueryDto.TitleEng]: SortingQuery.TitleEng,
  };

  /**
   *  Sorting mapper to dto.
   * @param model Sorting model.
   */
  export function toDto(model: SortingQuery): SortingQueryDto {
    return sortingModelToSortingDto[model];
  }

  /**
   *  Sorting mapper from dto.
   * @param dto Sorting dto.
   */
  export function fromDto(dto: SortingQueryDto): SortingQuery {
    return sortingDtoToSortingModel[dto];
  }
}

export namespace AnimeQueryMapper {

  /**
   *  AnimeQuery mapper to dto.
   * @param model AnimeQuery model.
   */
  export function toDto(model: AnimeQuery): AnimeQueryDto {
    const sorting = model.sorting && SortingMapper.toDto(model.sorting);
    return {
      ordering: sorting && model.ordering === OrderingQuery.Descending ? `-${sorting}` : sorting,
      search: model.search,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      type__in: model.types?.map(item => AnimeListQueryOptionsMapper.typeModelToDto[item]),
    };
  }

  /**
   *  AnimeQuery mapper from dto.
   * @param dto AnimeQuery dto.
   */
  export function fromDto(dto: AnimeQueryDto): AnimeQuery {
    const sorting = dto.ordering?.replace('-', '') as SortingQuery;
    return new AnimeQuery({
      sorting,
      ordering: dto.ordering?.includes('-') ? OrderingQuery.Ascending : OrderingQuery.Descending,
      types: dto.type__in?.map(item => AnimeMapper.typeDtoToModel[item]),
      search: dto.search,
    });
  }
}
