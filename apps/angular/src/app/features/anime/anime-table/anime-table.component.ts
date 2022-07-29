import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';

import { map, Observable, switchMap, tap } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import { SortValue } from '@js-camp/core/models/sorting';

import { AnimeService, QueryUrl } from '../../../../core/services/anime.service';

import { DEFAULT_ANIME_LIST_QUERY, DEFAULT_LIMIT, FILTER_TYPE_OPTIONS, ORDERING_OPTIONS, OrderOption, SORT_OPTIONS } from '../../../../constants';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent {

  /** Pagination result. */
  public readonly result$: Observable<Pagination<Anime>>;

  /** Sorting options. */
  public readonly sortingOptions = SORT_OPTIONS;

  /** Filter by type options. */
  public readonly filterTypeOptions = FILTER_TYPE_OPTIONS;

  /** Sorting options. */
  public readonly orderingOptions = ORDERING_OPTIONS;

  /** Sorting options. */
  public activePage = 1;

  /** Sorting options. */
  public totalPages = 0;

  public constructor(
    private readonly animeService: AnimeService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.result$ = this.activateRoute.queryParams.pipe(

      // tap((params: QueryUrl) => {
      //   this.sortBy = new FormControl(params.sortBy);
      // }),
      map(paramsURL => this.animeService.urlParamToAnimeQueryOptions(paramsURL)),
      switchMap(paramModel => this.animeService.getAnimeList(paramModel)),
      tap(pagination => {
        this.totalPages = pagination.count;
      }),
    );
  }

  /** Sorting options. */
  public getAnimeListQueryOptions(): AnimeListQueryOptions {
    return new AnimeListQueryOptions({
      ...DEFAULT_ANIME_LIST_QUERY,
      activePage: this.activePage,
      offset: (Number(this.activePage) - 1) * DEFAULT_LIMIT,
    });
  }

  /**
   *  Track anime list.
   * @param item Track by per item.
   * @param _index Item index.
   */
  public trackByAnime(_index: number, item: Anime): Anime['id'] {
    return item.id;
  }

  /** Type of form control. */
  public types = new FormControl('');

  /** Input of form control. */
  public search = new FormControl('');

  /**  Sort value of form control. */
  public sortBy = new FormControl<SortValue | undefined>(SortValue.TitleEnglish);

  /**  Ordering value of form control. */
  public ordering = new FormControl('');

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handlePageChange(event: PageEvent): void {
    this.activePage = event.pageIndex + 1;
    this.animeService.setUrl({ page: event.pageIndex + 1 });
  }

  /**
   * Handle change sort by options of anime list.
   * @param value Current sortby value of anime list.
   */
  public handleSortByChange(value: SortValue): void {
    this.animeService.setUrl({ sortBy: value });
  }

  /**
   * Handle change ordering options of anime list.
   * @param value Current ordering value of anime list.
   */
  public handleOrderingChange(value: OrderOption): void {
    this.animeService.setUrl({ ordering: value });
  }
}
