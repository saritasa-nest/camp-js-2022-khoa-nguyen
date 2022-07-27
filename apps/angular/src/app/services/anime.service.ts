import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
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

import { ANIME_LIST_API, DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_TOTAL_PAGE, key } from '../../constants';

import { ApiService } from './api.service';

/** Anime services. */
@Injectable({
  providedIn: 'root',
})

/** Anime services. */
export class AnimeService {

  /**
   * Anime services.
   * @param api Api methods.
   * @param route Api methods.
   */
  public constructor(private api: ApiService, private route: ActivatedRoute) {

  }

  /** Anime list query options. */
  public queryOptions = new AnimeListQueryOptions({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    activePage: DEFAULT_ACTIVE_PAGE,
    totalPages: DEFAULT_TOTAL_PAGE,
    sorting: new Sorting({
      title: SortTitle.TitleEnglish,
      value: SortValue.TitleEnglish,
      isAscending: true,
    }),
  });

  /** Anime list query options. */
  public getSearchParams(): AnimeListQueryOptions {
    const params = new URLSearchParams(window.location.search);
    console.log(params.get(key.activePage));
    return new AnimeListQueryOptions({
      ...this.queryOptions,
      offset: params.get(key.activePage) != null ? (Number(params.get(key.activePage)) - 1) * DEFAULT_LIMIT : DEFAULT_OFFSET,
      activePage: params.get(key.activePage) != null ? Number(params.get(key.activePage)) : 1,
    });
  }

  /** Get list of anime.*/
  public getAnimeList(): Observable<Pagination<Anime>> {
    // this.route.queryParams.subscribe(params => {
    //   this.queryOptions = new AnimeListQueryOptions({
    //     ...this.queryOptions,
    //     activePage: params['activePage'],
    //     offset: isNaN(params['activePage']) ? (Number.parseInt(params['activePage'], 10) - 1) * DEFAULT_LIMIT : DEFAULT_OFFSET,
    //   });
    // });

    const paramDto = AnimeListQueryOptionsMapper.toDto(this.getSearchParams());
    return this.api.getData<PaginationDto<AnimeDto>, AnimeListQueryOptionsDto>(ANIME_LIST_API, paramDto)
      .pipe(map(data => PaginationMapper.fromDto<AnimeDto, Anime>(data, AnimeMapper.fromDto)));
  }
}
