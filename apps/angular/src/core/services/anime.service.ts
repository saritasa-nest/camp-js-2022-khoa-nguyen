import { Injectable } from '@angular/core';
import { AnimeDto, AnimeListQueryOptionsDto, PaginationDto, TypeDto } from '@js-camp/core/dtos';
import { AnimeListQueryOptionsMapper, AnimeMapper, PaginationMapper } from '@js-camp/core/mappers';
import { Anime, AnimeListQueryOptions, Pagination, Sorting, SortTitle, SortValue } from '@js-camp/core/models';
import { map, Observable } from 'rxjs';

import { ANIME_LIST_API, DEFAULT_ANIME_LIST_QUERY, DEFAULT_LIMIT, DEFAULT_SEARCH, OrderOption, SORT_OPTIONS } from '../../constants';

import { ApiService } from './api.service';

/** Anime query URL. */
export interface QueryUrl {

  /** Current page of pagination. */
  readonly page?: number;

  /** Filter by type in anime table. */
  readonly type?: string;

  /** Ordering options. */
  readonly ordering?: OrderOption;

  /** Search value. */
  readonly search?: string | null;

  /** Sort by option. */
  readonly sortBy?: SortValue;

  /** Items per page. */
  readonly limit?: number;

}

/** Anime query URL. */
export interface SettingOfAnimeList {

  /** Current page of pagination. */
  readonly page?: number;

  /** Filter by type in anime table. */
  readonly type?: TypeDto[];

  /** Ordering options. */
  readonly ordering?: OrderOption;

  /** Search value. */
  readonly search?: string;

  /** Sort by option. */
  readonly sortBy?: SortValue;

  /** Items per page. */
  readonly limit?: number;

}

/** Anime services. */
@Injectable({
  providedIn: 'root',
})

/** Anime services. */
export class AnimeService {

  public constructor(
    private readonly apiService: ApiService,
  ) { }

  /**
   * Get list of anime.
   * @param paramsModel Anime list query options.
   */
  public getAnimeList(paramsModel: AnimeListQueryOptions): Observable<Pagination<Anime>> {
    const paramDto = AnimeListQueryOptionsMapper.toDto(paramsModel);
    return this.apiService.getData<PaginationDto<AnimeDto>, AnimeListQueryOptionsDto>(ANIME_LIST_API, paramDto)
      .pipe(map(data => PaginationMapper.fromDto<AnimeDto, Anime>(data, AnimeMapper.fromDto)));
  }

  /**
   * URL to params .
   * @param params Query param on URl.
   */
  public urlParamToAnimeQueryOptions(params: QueryUrl): AnimeListQueryOptions {
    const activePage = params.page ?? 1;
    const limit = params.limit ?? DEFAULT_LIMIT;
    return new AnimeListQueryOptions({
      ...DEFAULT_ANIME_LIST_QUERY,
      limit,
      activePage,
      offset: (activePage - 1) * limit,
      multipleType: params.type ?? TypeDto.Default,
      sorting: new Sorting({
        title: params.sortBy != null ?
          SORT_OPTIONS.filter(item => item.value === params.sortBy)[0].title :
          SortTitle.TitleEnglish,
        value: params.sortBy ?? SortValue.TitleEnglish,
        isAscending: params.ordering != null ? params.ordering === OrderOption.Ascending : true,
      }),
      search: params.search ?? DEFAULT_SEARCH,
    });
  }

  /**
   * Transfer anime list query option to setting of anime list.
   * @param params Anime list query options model.
   */
  public paramModelToSettingOfAnimeList(params: AnimeListQueryOptions): SettingOfAnimeList {
    return {
      limit: params.limit,
      page: params.activePage,
      sortBy: params.sorting.value,
      ordering: params.sorting.isAscending ?
        OrderOption.Ascending :
        OrderOption.Descending,
      search: params.search,
      type: params.multipleType == null ?
        [TypeDto.Default] :
        params.multipleType
          .split(',')
          .map(item => item as TypeDto),
    };
  }

  /**
   * Transfer anime list query option to setting of anime list.
   * @param settings Anime list query options model.
   */
  public settingsOfAnimeListToAnimeListQueryModel(settings: SettingOfAnimeList): AnimeListQueryOptions {
    const activePage = settings.page ?? 1;
    const limit = settings.limit ?? DEFAULT_LIMIT;
    return new AnimeListQueryOptions({
      ...DEFAULT_ANIME_LIST_QUERY,
      limit,
      activePage,
      offset: (activePage - 1) * limit,
      multipleType: settings.type?.join(','),
      sorting: new Sorting({
        title: settings.sortBy != null ?
          SORT_OPTIONS.filter(item => item.value === settings.sortBy)[0].title :
          SortTitle.TitleEnglish,
        value: settings.sortBy ?? SortValue.TitleEnglish,
        isAscending: settings.ordering != null ? settings.ordering === OrderOption.Ascending : true,
      }),
      search: settings.search ?? DEFAULT_SEARCH,
    });
  }

  /**
   * Transfer anime list query option to setting of anime list.
   * @param settings Anime list query options model.
   */
  public settingsOfAnimeListToUrlParams(settings: SettingOfAnimeList): QueryUrl {
    return {
      limit: settings.limit,
      page: settings.page,
      sortBy: settings.sortBy,
      ordering: settings.ordering,
      search: settings.search ? settings.search : DEFAULT_SEARCH,
      type: settings.type ? settings.type.join(',') : TypeDto.Default,
    };
  }

  /**
   * Transfer anime list query option to setting of anime list.
   * @param params Anime list query options model.
   */
  public urlParamsToSettingOfAnimeList(params: QueryUrl): SettingOfAnimeList {
    return {
      limit: params.limit,
      page: params.page,
      sortBy: params.sortBy,
      ordering: params.ordering,
      search: params.search ? params.search : DEFAULT_SEARCH,
      type: params.type ? params.type.split(',').map(item => item as TypeDto) : [TypeDto.Default],
    };
  }
}
