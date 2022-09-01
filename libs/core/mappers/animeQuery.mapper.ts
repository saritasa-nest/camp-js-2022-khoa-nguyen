import { TypeDto } from '../dtos';
import { AnimeQueryDto, AnimeQueryUrl, SortingQueryDto } from '../dtos/animeQuery.dto';
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

  export const fromUrl = fromDto;
  export const toUrl = toDto;
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
      type__in: model.types?.map(item => AnimeListQueryOptionsMapper.typeModelToDto[item]).join(','),
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
      types: dto.type__in?.split(',').map(item => AnimeMapper.typeDtoToModel[item as TypeDto]),
      search: dto.search,
    });
  }

  /**
   *  AnimeQuery mapper from url.
   * @param url AnimeQuery url.
   */
  export function fromUrl(url: AnimeQueryUrl): AnimeQuery {
    const types = url.types?.split(',').map(item => AnimeMapper.typeDtoToModel[(item as TypeDto)]);
    return new AnimeQuery({
      sorting: url.sorting && SortingMapper.fromUrl(url.sorting),
      ordering: url.ordering,
      types,
      search: url.search,
    });
  }
}
