import { Component, NgIterable, OnInit } from '@angular/core';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { ApiService } from '../../services/api.service';

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

  public constructor(private api: ApiService) {}

  /** Init anime table. */
  public ngOnInit(): void {
    this.api.getData<PaginationDto<AnimeDto>>('anime/anime/').subscribe(data => {
      this.result = PaginationMapper.fromDto<AnimeDto, Anime>(data, AnimeMapper.fromDto);
      this.animeList = this.result.results;
    });
  }
}
