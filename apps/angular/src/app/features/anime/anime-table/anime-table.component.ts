import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeDto } from '@js-camp/core/dtos';
import { Anime, Pagination, SortValue } from '@js-camp/core/models';
import { BehaviorSubject, combineLatestWith, debounceTime, distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';

import { DEFAULT_ANIME_LIST_QUERY, DEFAULT_SEARCH, FILTER_TYPE_OPTIONS, ORDERING_OPTIONS, OrderOption, SORT_OPTIONS } from '../../../../constants';
import { AnimeService, QueryUrl, SettingOfAnimeList } from '../../../../core/services';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AnimeTableComponent {

  /** Column of table. */
  public displayedColumns: string[] = ['image', 'titleEnglish', 'titleJapan', 'airedStartDate', 'type', 'status'];

  /** Pagination result. */
  public readonly result$: Observable<Pagination<Anime>>;

  /** Sorting options. */
  public readonly sortingOptions = SORT_OPTIONS;

  /** Filter by type options. */
  public readonly filterTypeOptions = FILTER_TYPE_OPTIONS;

  /** Ordering options. */
  public readonly orderingOptions = ORDERING_OPTIONS;

  /** Total items of anime table. */
  public readonly totalItems$ = new BehaviorSubject<number>(0);

  /** Anime list query params. */
  public readonly settingOfAnimeList$ = new BehaviorSubject<SettingOfAnimeList>(
    this.animeService.paramModelToSettingOfAnimeList(DEFAULT_ANIME_LIST_QUERY),
  );

  /** Input of form control. */
  public readonly search$ = new BehaviorSubject<string>(DEFAULT_SEARCH);

  public constructor(
    private readonly animeService: AnimeService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
  ) {

    const searchValue$ = this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(value => this.setUrl({ search: value })),
    );

    this.result$ = this.activateRoute.queryParams.pipe(
      combineLatestWith(searchValue$),
      map(([paramsURL, search]) => this.animeService.urlParamToAnimeQueryOptions({ ...paramsURL, search })),
      tap(paramModel => {
        const settingOfAnimeList = animeService.paramModelToSettingOfAnimeList(paramModel);
        this.settingOfAnimeList$.next(settingOfAnimeList);
        this.search$.next(paramModel.search);
      }),
      switchMap(paramModel => this.animeService.getAnimeList(paramModel)),
      tap(pagination => {
        this.totalItems$.next(pagination.count);
      }),
    );
  }

  /**
   * Sets new query params in url.
   * @param params Query params.
   */
  private setUrl(params: QueryUrl): void {
    const { queryParams } = this.activateRoute.snapshot;
    let trueParams = { ...queryParams, ...params };
    if (params.search === DEFAULT_SEARCH) {

      // I disable eslint on this line because I just want to get the search key
      // out of the object and not using it below

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { search, ...rest } = trueParams;
      trueParams = rest;
    }
    if (params.type === TypeDto.Default) {

      // I disable eslint on this line because I just want to get the search key
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
   * Handle set sort built in options to url.
   * @param sortBy Sort value to url.
   * @param sort Current sort value.
   */
  private setUrlSortBuildIn(sortBy: SortValue, sort: Sort): void {
    this.setUrl({
      sortBy,
      ordering: sort.direction === 'asc' ? OrderOption.Ascending : OrderOption.Descending,
    });
  }

  /**
   * Track anime list.
   * @param item Track by per item.
   * @param index Item index.
   */
  public trackByAnime(index: number, item: Anime): Anime['id'] {
    return item.id;
  }

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handlePageChange(event: PageEvent): void {
    this.setUrl({ page: event.pageIndex + 1, limit: event.pageSize });
  }

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handleTypeChange(event: MatSelectChange): void {
    const value = (event.value as TypeDto[]).join(',');
    this.setUrl({ type: value, page: 1 });
  }

  /**
   * Handle change sort by options of anime list.
   * @param event Current sortby value of anime list.
   */
  public handleSortByChange(event: MatSelectChange): void {
    this.setUrl({ sortBy: event.value });
  }

  /**
   * Handle change ordering options of anime list.
   * @param event Current ordering value of anime list.
   */
  public handleOrderingChange(event: MatSelectChange): void {
    this.setUrl({ ordering: event.value });
  }

  /**
   * Handle search title anime of anime list.
   * @param event Current search value of anime list.
   */
  public handleInputSearch(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.search$.next(value.trim());
    this.setUrl({ page: 1 });
  }

  /**
   * Handle sort data in table of anime list.
   * @param sort Current active Sort value.
   */
  public handleSortDataBuiltIn(sort: Sort): void {
    switch (sort.active) {
      case 'sortTitleEnglish':
        this.setUrlSortBuildIn(SortValue.TitleEnglish, sort);
        break;
      case 'sortAiredStartDate':
        this.setUrlSortBuildIn(SortValue.AiredStartDate, sort);
        break;
      case 'sortStatus':
        this.setUrlSortBuildIn(SortValue.Status, sort);
        break;
      default:
        this.setUrlSortBuildIn(SortValue.TitleEnglish, sort);
    }
  }

}
