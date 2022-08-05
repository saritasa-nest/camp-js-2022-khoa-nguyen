import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeDto } from '@js-camp/core/dtos';
import { Anime, Pagination, SortValue } from '@js-camp/core/models';
import { BehaviorSubject, combineLatestWith, debounceTime, distinctUntilChanged, ignoreElements, map, merge, Observable, shareReplay, skip, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_SEARCH, FILTER_TYPE_OPTIONS, ORDERING_OPTIONS, OrderOption, SORT_OPTIONS, url } from '../../../../constants';
import { AnimeService, QueryUrl, SettingOfAnimeList } from '../../../../core/services';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AnimeTableComponent implements OnInit, OnDestroy {

  /** Column of table. */
  public displayedColumns: readonly string[] = ['image', 'titleEnglish', 'titleJapan', 'airedStartDate', 'type', 'status'] as const;

  /** Anime mapper. */
  public readonly animeMapper = this.animeService.mapper();

  /** Sorting options. */
  public readonly sortingOptions = SORT_OPTIONS;

  /** Filter by type options. */
  public readonly filterTypeOptions = FILTER_TYPE_OPTIONS;

  /** Ordering options. */
  public readonly orderingOptions = ORDERING_OPTIONS;

  /** Pagination result. */
  public readonly paginationResult$: Observable<Pagination<Anime>>;

  /** Combined query observable. */
  public readonly queryCombine$: Observable<[SettingOfAnimeList, string]>;

  /** Setting anime list updated when emit queryCombine. */
  public readonly settingAnimeListUpdate$: Observable<SettingOfAnimeList>;

  /** Total items of anime table. */
  public readonly totalItems$ = new BehaviorSubject<number>(0);

  /** Loading status. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** Get search initial value. */
  public getSearchValue(): string {
    const currentParams = this.activateRoute.snapshot.queryParams;
    return this.animeMapper.urlParamToModel(currentParams).search;
  }

  /** Search. */
  public readonly search = new FormControl<string>(this.getSearchValue());

  /** Anime list query params. */
  public readonly settingOfAnimeList$ = new BehaviorSubject<SettingOfAnimeList>(
    this.animeMapper.urlToSetting(this.activateRoute.snapshot.queryParams),
  );

  /** Subject that is used for unsubscribing from streams. */
  private readonly subscriptionManager$ = new Subject<void>();

  /**
   * Set value to setting anime list.
   * @param settings Settings of anime list.
   */
  public setValueToSettingAnimeListObservable(settings: SettingOfAnimeList): void {
    const currentParams = this.activateRoute.snapshot.queryParams;
    const currentSettings = this.animeMapper.urlToSetting(currentParams);
    this.settingOfAnimeList$.next({ ...currentSettings, ...settings });
  }

  public constructor(
    private readonly animeService: AnimeService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.queryCombine$ = this.settingOfAnimeList$.pipe(
      combineLatestWith(
        this.search.valueChanges.pipe(
          startWith(this.search.value),
          distinctUntilChanged(),
          map(value => value ? value.trim() : DEFAULT_SEARCH),
          debounceTime(500),
        ),
      ),
    );

    this.settingAnimeListUpdate$ = this.queryCombine$.pipe(
      map(([settings]) => settings),
    );

    this.paginationResult$ = this.settingAnimeListUpdate$.pipe(
      map(settings => this.animeMapper.settingToModel(settings)),
      switchMap(animeListQueryModel => this.animeService.getAnimeList(animeListQueryModel)),
      shareReplay({ refCount: true, bufferSize: 1 }),
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

    this.router.navigate([url.home], {
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
  private setValueSortBuiltIn(sortBy: SortValue, sort: Sort): void {
    this.setValueToSettingAnimeListObservable({
      sortBy,
      ordering: sort.direction === 'asc' ? OrderOption.Ascending : OrderOption.Descending,
    });
  }

  /**
   * Track anime list.
   * @param item Track by per item.
   * @param _index Item index.
   */
  public trackByAnime(_index: number, item: Anime): Anime['id'] {
    return item.id;
  }

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handlePageChange(event: PageEvent): void {
    this.setValueToSettingAnimeListObservable({ page: event.pageIndex + 1, limit: event.pageSize });
  }

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handleTypeChange(event: MatSelectChange): void {
    this.setValueToSettingAnimeListObservable({ type: event.value, page: DEFAULT_ACTIVE_PAGE });

  }

  /**
   * Handle change sort by options of anime list.
   * @param event Current sortby value of anime list.
   */
  public handleSortByChange(event: MatSelectChange): void {
    this.setValueToSettingAnimeListObservable({ sortBy: event.value });
  }

  /**
   * Handle change ordering options of anime list.
   * @param event Current ordering value of anime list.
   */
  public handleOrderingChange(event: MatSelectChange): void {
    this.setValueToSettingAnimeListObservable({ ordering: event.value });
  }

  /**
   * Handle sort data in table of anime list.
   * @param sort Current active Sort value.
   */
  public handleSortDataBuiltIn(sort: Sort): void {
    switch (sort.active) {
      case 'sortTitleEnglish':
        this.setValueSortBuiltIn(SortValue.TitleEnglish, sort);
        break;
      case 'sortAiredStartDate':
        this.setValueSortBuiltIn(SortValue.AiredStartDate, sort);
        break;
      case 'sortStatus':
        this.setValueSortBuiltIn(SortValue.Status, sort);
        break;
      default:
        this.setValueSortBuiltIn(SortValue.TitleEnglish, sort);
    }
  }

  /** OnInit. */
  public ngOnInit(): void {

    const queryCombineSideEffect$ = this.queryCombine$.pipe(
      map(([, searchValue]) => searchValue),
      distinctUntilChanged(),
      skip(1),
      tap(searchValue => {
          this.setValueToSettingAnimeListObservable({ search: searchValue, page: DEFAULT_ACTIVE_PAGE });
        }),
    );

    const setUrlSideEffect$ = this.settingAnimeListUpdate$.pipe(
      tap(settings => {
        this.isLoading$.next(true);
        this.setUrl(this.animeMapper.settingToUrl(settings));
      }),
    );

    const paginationResultSideEffect$ = this.paginationResult$.pipe(
      tap(animeList => {
        this.isLoading$.next(false);
        this.totalItems$.next(animeList.count);
      }),
    );

    merge(setUrlSideEffect$, queryCombineSideEffect$, paginationResultSideEffect$)
      .pipe(ignoreElements(), takeUntil(this.subscriptionManager$))
      .subscribe();
  }

  /** OnDestroy. */
  public ngOnDestroy(): void {
    this.subscriptionManager$.next();
    this.subscriptionManager$.complete();
  }
}
