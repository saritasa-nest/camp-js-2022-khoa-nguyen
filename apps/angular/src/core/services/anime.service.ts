import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDto, TypeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeListQueryOptionsDto } from '@js-camp/core/dtos/animeListQueryOptions.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeListQueryOptionsMapper } from '@js-camp/core/mappers/animeListQueryOptions.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime, TypeModel } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sorting, SortTitle, SortValue } from '@js-camp/core/models/sorting';
import { map, Observable, switchMap } from 'rxjs';

import { ANIME_LIST_API, DEFAULT_ANIME_LIST_QUERY, DEFAULT_LIMIT, OrderOption, SORT_OPTIONS } from '../../constants';

import { ApiService } from './api.service';

/** Anime services. */
interface QueryUrl {

  /** Anime services. */
  page?: number;

  /** Anime services. */
  type?: TypeDto;

  /** Anime services. */
  ordering?: OrderOption;

  /** Anime services. */
  search?: string;

  /** Sort services. */
  sortBy?: SortValue;

}

/** Anime services. */
@Injectable({
  providedIn: 'root',
})

/** Anime services. */
export class AnimeService {

  public constructor(
    private readonly api: ApiService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }

  /**
   * Get list of anime.
   * @param options Anime list query options.
   */
  public getAnimeList(options?: AnimeListQueryOptions): Observable<Pagination<Anime>> {
    return this.getQueryOptionsOnUrl().pipe(
      switchMap(currentParams => {
          const paramDto = AnimeListQueryOptionsMapper.toDto(currentParams);
          if (options == null) {
            return this.api.getData<PaginationDto<AnimeDto>, AnimeListQueryOptionsDto>(ANIME_LIST_API, paramDto);
          }
          const paramDtoOptions = AnimeListQueryOptionsMapper.toDto(options);
          const queryParams = this.queryOptionsToUrlParam(options);
          this.setUrl(queryParams);
          return this.api.getData<PaginationDto<AnimeDto>, AnimeListQueryOptionsDto>(ANIME_LIST_API, { ...paramDto, ...paramDtoOptions });
        }),
      map(data => PaginationMapper.fromDto<AnimeDto, Anime>(data, AnimeMapper.fromDto)),
    );
  }

  /** Anime services. */
  public getQueryOptionsOnUrl(): Observable<AnimeListQueryOptions> {
    return this.activateRoute.queryParams.pipe(
      map(params => this.urlParamToAnimeQueryOptions(params)),
    );
  }

  /**
   * Sets new query params in url.
   * @param params Query params.
   */
  private setUrl(params: QueryUrl): void {
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  private urlParamToAnimeQueryOptions(params: QueryUrl): AnimeListQueryOptions {
    const activePage = params.page ?? 1;
    return new AnimeListQueryOptions({
      ...DEFAULT_ANIME_LIST_QUERY,
      activePage,
      offset: (activePage - 1) * DEFAULT_LIMIT,
      type: params.type != null ? AnimeMapper.typeDtoToModel[params.type] : TypeModel.Default,
      sorting: new Sorting({
        title: params.sortBy != null ? SORT_OPTIONS.filter(item => item.value === params.sortBy)[0].title : SortTitle.TitleEnglish,
        value: params.sortBy != null ? params.sortBy : SortValue.TitleEnglish,
        isAscending: params.ordering != null ? params.ordering === OrderOption.Ascending : true,
      }),
      search: params.search ? params.search : '',
    });
  }

  private queryOptionsToUrlParam(options: AnimeListQueryOptions): QueryUrl {
    return {
      page: options.activePage,
      type: options.type ? AnimeListQueryOptionsMapper.typeModelToDto[options.type] : undefined,
      ordering: options.sorting.isAscending ? OrderOption.Ascending : OrderOption.Descending,
      search: options.search,
      sortBy: options.sorting.value,
    };
  }
}
