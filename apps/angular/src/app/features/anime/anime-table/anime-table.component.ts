import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { TypeDto } from '@js-camp/core/dtos';
import { Anime, Pagination, SortValue } from '@js-camp/core/models';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';

import { DEFAULT_SEARCH, FILTER_TYPE_OPTIONS, ORDERING_OPTIONS, OrderOption, SORT_OPTIONS } from '../../../../constants';
import { AnimeService } from '../../../../core/services';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AnimeTableComponent implements OnDestroy, OnInit {

  /** Pagination result. */
  public readonly result$: Observable<Pagination<Anime>>;

  /** Sorting options. */
  public readonly sortingOptions = SORT_OPTIONS;

  /** Filter by type options. */
  public readonly filterTypeOptions = FILTER_TYPE_OPTIONS;

  /** Ordering options. */
  public readonly orderingOptions = ORDERING_OPTIONS;

  /** Current page in pagination. */
  public readonly activePage$ = new BehaviorSubject<number>(0);

  /** Total items of anime table. */
  public readonly totalItems$ = new BehaviorSubject<number>(0);

  /** Type of form control. */
  public readonly types$ = new BehaviorSubject<TypeDto[]>([TypeDto.Default]);

  /** Input of form control. */
  public readonly search$ = new BehaviorSubject<string>(DEFAULT_SEARCH);

  /** Sort value of form control. */
  public readonly sortBy$ = new BehaviorSubject<SortValue>(SortValue.TitleEnglish);

  /** Ordering value of form control. */
  public readonly ordering$ = new BehaviorSubject<OrderOption>(OrderOption.Ascending);

  public constructor(
    private readonly animeService: AnimeService,
    private readonly activateRoute: ActivatedRoute,
  ) {

    this.result$ = this.activateRoute.queryParams.pipe(
      map(paramsURL => this.animeService.urlParamToAnimeQueryOptions(paramsURL)),
      tap(paramModel => {
        this.sortBy$.next(paramModel.sorting.value);
        this.ordering$.next(
          paramModel.sorting.isAscending ?
          OrderOption.Ascending :
          OrderOption.Descending,
        );

        this.search$.next(paramModel.search);
        this.types$.next(
          paramModel.multipleType == null ?
            [TypeDto.Default] :
            paramModel.multipleType
              .split(',')
              .map(item => item as TypeDto),
        );
        this.activePage$.next(paramModel.activePage);
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
    this.animeService.setUrl({ page: event.pageIndex + 1 });
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
    this.search$.next(value);
    const timeOutId = setTimeout(() => {
      this.animeService.setUrl({ page: 1 });
      clearTimeout(timeOutId);
    }, 1000);
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
