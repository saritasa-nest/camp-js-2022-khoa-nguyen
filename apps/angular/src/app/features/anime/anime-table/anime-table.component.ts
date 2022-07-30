import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { BehaviorSubject, debounceTime, map, Observable, switchMap, tap } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { SortValue } from '@js-camp/core/models/sorting';

import { MatSelectChange } from '@angular/material/select';

import { TypeDto } from '@js-camp/core/dtos/anime.dto';

import { AnimeService, QueryUrl } from '../../../../core/services';

import { DEFAULT_SEARCH, FILTER_TYPE_OPTIONS, ORDERING_OPTIONS, OrderOption, SORT_OPTIONS } from '../../../../constants';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AnimeTableComponent implements OnDestroy {

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
      tap((params: QueryUrl) => {

        this.setSubjectData<SortValue>(params.sortBy, this.sortBy$, SortValue.TitleEnglish);
        this.setSubjectData<string>(params.search, this.search$, DEFAULT_SEARCH);
        this.setSubjectData<OrderOption>(params.ordering, this.ordering$, OrderOption.Ascending);

        if (params.type == null) {
          this.types$.next([TypeDto.Default]);
        } else {
          const paramsType = params.type
            .split(',')
            .map(item => item as TypeDto);
          this.types$.next(paramsType);
        }
      }),
      map(paramsURL => this.animeService.urlParamToAnimeQueryOptions(paramsURL)),
      tap(paramModel => {
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
    this.search$
      .pipe(
        debounceTime(500),
        map(() => (event.target as HTMLInputElement).value),
      )
      .subscribe(value => this.animeService.setUrl({ search: value }));
  }

  /** OnDestroy to unsubscribe observable. */
  public ngOnDestroy(): void {
    this.search$.unsubscribe();
  }

  /**
   * Set data to behavior subject.
   * @param value Value which need to be set.
   * @param subject$ Subject behavior.
   * @param defaultValue Value which need to be set when param is null.
   */
  public setSubjectData<T>(
    value: T | undefined,
    subject$: BehaviorSubject<T>,
    defaultValue: T,
  ): void {
    if (value == null) {
      subject$.next(defaultValue);
      return;
    }
    subject$.next(value);
  }
}
