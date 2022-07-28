import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';

import { Observable } from 'rxjs';

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
  public result$: Observable<Pagination<Anime>> | undefined | null;

  /** Sorting options. */
  public readonly sortingOptions = SORT_OPTIONS;

  /** Filter by type options. */
  public readonly filterTypeOptions = FILTER_TYPE_OPTIONS;

  /** Sorting options. */
  public readonly orderingOptions = ORDERING_OPTIONS;

  /** Sorting options. */
  public activePage = 1;

  public constructor(private anime: AnimeService, private router: Router, private activeRoute: ActivatedRoute) {

  }

  /**
   * Handle change active page of pagination.
   * @param event OnChange event of pagination.
   */
  public handlePageChange(event: PageEvent): void {
    this.activePage = event.pageIndex + 1;
    this.result$ = this.anime.getAnimeList(this.getAnimeListQueryOptions());
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
