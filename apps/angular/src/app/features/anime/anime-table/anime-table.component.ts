import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import { SortValue } from '@js-camp/core/models/sorting';

import { MatSelectChange } from '@angular/material/select';

import { AnimeService, QueryUrl } from '../../../../core/services';

import { FILTER_TYPE_OPTIONS, ORDERING_OPTIONS, OrderOption, SORT_OPTIONS } from '../../../../constants';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

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
  public readonly activePage$ = new BehaviorSubject<number>(0);

  /** Sorting options. */
  public readonly totalItems$ = new BehaviorSubject<number>(0);

  public constructor(
    private readonly animeService: AnimeService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.result$ = this.activateRoute.queryParams.pipe(

      tap((params: QueryUrl) => {
        if (params.sortBy != null && params.ordering != null) {
          this.sortBy$.next(params.sortBy);
          this.ordering$.next(params.ordering);
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
  public sortBy$ = new BehaviorSubject<SortValue>(SortValue.TitleEnglish);

  /**  Ordering value of form control. */
  public ordering$ = new BehaviorSubject<OrderOption>(OrderOption.Ascending);

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handlePageChange(event: PageEvent): void {
    this.animeService.setUrl({ page: event.pageIndex + 1 });
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
}
