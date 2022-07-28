import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';

import { Observable, tap } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

import { DEFAULT_ANIME_LIST_QUERY, DEFAULT_LIMIT, FILTER_TYPE_OPTIONS, ORDERING_OPTIONS, SORT_OPTIONS } from '../../../../constants';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {

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

  public constructor(private animeService: AnimeService) {
    this.result$ = this.animeService.getAnimeList(this.getAnimeListQueryOptions()).pipe(
      tap(pagination => {
        this.totalPages = pagination.count;
      }),
    );
  }

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handlePageChange(event: PageEvent): void {
    // this.activePage = event.pageIndex + 1;
    // this.animeService.setUrl({ page: event.pageIndex + 1 });
  }

  /** Sorting options. */
  public getAnimeListQueryOptions(): AnimeListQueryOptions {
    return new AnimeListQueryOptions({
      ...DEFAULT_ANIME_LIST_QUERY,
      activePage: this.activePage,
      offset: (Number(this.activePage) - 1) * DEFAULT_LIMIT,
    });
  }

  /** Init anime list table. */
  public ngOnInit(): void { }

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

}
