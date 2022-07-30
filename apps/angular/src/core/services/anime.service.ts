import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDto, TypeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeListQueryOptionsDto } from '@js-camp/core/dtos/animeListQueryOptions.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeListQueryOptionsMapper } from '@js-camp/core/mappers/animeListQueryOptions.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sorting, SortTitle, SortValue } from '@js-camp/core/models/sorting';
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
  readonly search?: string;

  /** Sort by option. */
  readonly sortBy?: SortValue;

}

/** Anime services. */
@Injectable({
  providedIn: 'root',
})

/** Anime services. */
export class AnimeService {

  public constructor(
    private readonly apiService: ApiService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
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
   * Sets new query params in url.
   * @param params Query params.
   */
  public setUrl(params: QueryUrl): void {
    const { queryParams } = this.activateRoute.snapshot;
    let trueParams = { ...queryParams, ...params };
    if (params.search === DEFAULT_SEARCH) {

      // I disable eslint in this line because I just want to get the search key
      // out of the object and not using it below

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { search, ...rest } = trueParams;
      trueParams = rest;
    }
    if (params.type === TypeDto.Default) {

      // I disable eslint in this line because I just want to get the search key
      // out of the object and not using it below

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, ...rest } = trueParams;
      trueParams = rest;
    }
    this.router.navigate(['/'], {
      relativeTo: this.activateRoute,
      queryParams: trueParams,
      queryParamsHandling: '',
    });
  }

  /**
   * URL to params .
   * @param params Query param on URl.
   */
  public urlParamToAnimeQueryOptions(params: QueryUrl): AnimeListQueryOptions {
    const activePage = params.page ?? 1;
    return new AnimeListQueryOptions({
      ...DEFAULT_ANIME_LIST_QUERY,
      activePage,
      offset: (activePage - 1) * DEFAULT_LIMIT,
      multipleType: params.type != null ? params.type : TypeDto.Default,
      sorting: new Sorting({
        title: params.sortBy != null ?
          SORT_OPTIONS.filter(item => item.value === params.sortBy)[0].title :
          SortTitle.TitleEnglish,
        value: params.sortBy != null ? params.sortBy : SortValue.TitleEnglish,
        isAscending: params.ordering != null ? params.ordering === OrderOption.Ascending : true,
      }),
      search: params.search ? params.search : DEFAULT_SEARCH,
    });
  }
}
