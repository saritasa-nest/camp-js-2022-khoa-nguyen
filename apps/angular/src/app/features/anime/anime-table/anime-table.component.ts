import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { TypeDto } from '@js-camp/core/dtos';
import { Anime, Pagination } from '@js-camp/core/models';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';

import { DEFAULT_ANIME_LIST_QUERY, DEFAULT_SEARCH, FILTER_TYPE_OPTIONS, ORDERING_OPTIONS, SORT_OPTIONS } from '../../../../constants';
import { AnimeService, SettingOfAnimeList } from '../../../../core/services';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AnimeTableComponent implements OnDestroy, OnInit {

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
  ) {

    this.result$ = this.activateRoute.queryParams.pipe(
      map(paramsURL => this.animeService.urlParamToAnimeQueryOptions(paramsURL)),
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
    this.animeService.setUrl({ page: event.pageIndex + 1, limit: event.pageSize });
  }

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handleTypeChange(event: MatSelectChange): void {
    const value = (event.value as TypeDto[]).join(',');
    this.animeService.setUrl({ type: value, page: 1 });
  }

  /**
   * Handle change sort by options of anime list.
   * @param event Current sortby value of anime list.
   */
  public handleSortByChange(event: MatSelectChange): void {
    this.animeService.setUrl({ sortBy: event.value });
  }

  /**
   * Handle change ordering options of anime list.
   * @param event Current ordering value of anime list.
   */
  public handleOrderingChange(event: MatSelectChange): void {
    this.animeService.setUrl({ ordering: event.value });
  }

  /**
   * Handle search title anime of anime list.
   * @param event Current search value of anime list.
   */
  public handleInputSearch(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.search$.next(value.trim());
    this.search$
      .pipe(
        distinctUntilChanged(),
        debounceTime(800),
      )
      .subscribe(() => this.animeService.setUrl({ page: 1 }));
  }

  /** OnOnInit to subscribe observable. */
  public ngOnInit(): void {
    this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(value => this.animeService.setUrl({ search: value }));
  }

  /** OnDestroy to unsubscribe observable. */
  public ngOnDestroy(): void {
    this.search$.unsubscribe();
  }
}
