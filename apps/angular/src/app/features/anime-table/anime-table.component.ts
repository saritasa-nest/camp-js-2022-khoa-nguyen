import { Component, NgIterable, OnInit } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sorting, SortTitle, SortValue } from '@js-camp/core/models/sorting';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_TOTAL_PAGE } from '../../../constants';

import { AnimeService } from '../../services/anime.service';

/** Anime table list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {
  /** Anime list. */
  public animeList: NgIterable<Anime> | undefined | null;

  /** Pagination result. */
  public result: Pagination<Anime> | undefined | null;

  /** Default query anime list. */
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

  public constructor(private anime: AnimeService) {}

  /** Init anime table. */
  public ngOnInit(): void {
    this.anime.getAnimeList(this.defaultQuery).subscribe(data => {
      this.result = data;
      this.animeList = data.results;
    });
  }
}
