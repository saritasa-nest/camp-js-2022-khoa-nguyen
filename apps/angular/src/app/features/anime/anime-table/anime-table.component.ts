import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sorting, SortTitle, SortValue } from '@js-camp/core/models/sorting';
import { Observable } from 'rxjs';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_TOTAL_PAGE, FILTER_TYPE_OPTIONS, SORT_OPTIONS, key } from '../../../../constants';

import { AnimeService } from '../../../services/anime.service';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {

  /** Pagination result. */
  public result$: Observable<Pagination<Anime>> | undefined | null;

  /** Default query options of anime list. */
  public defaultQuery = new AnimeListQueryOptions({
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

  /** Sorting options. */
  public readonly sortingOptions = SORT_OPTIONS;

  /** Filter by type options. */
  public readonly filterTypeOptions = FILTER_TYPE_OPTIONS;

  public constructor(private anime: AnimeService, private router: Router) {}

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handlePageChange(event: PageEvent): void {
    this.router.navigate(['/'], { queryParams: { [key.activePage]: event.pageIndex + 1 } });
    this.result$ = this.anime.getAnimeList();
  }

  /** Init anime list table. */
  public ngOnInit(): void {
    this.getResult();
  }

  /**
   *  Track anime list.
   * @param item Track by per item.
   * @param _index Item index.
   */
  public trackByAnime(_index: number, item: Anime): Anime['id'] {
    return item.id;
  }

  /** Get result of anime api call. */
  public getResult(): void {
    this.result$ = this.anime.getAnimeList();
  }

  /** Type of form control. */
  public types = new FormControl('');

  /** Input of form control. */
  public search = new FormControl('');

}
