import { Injectable } from '@angular/core';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeListQueryOptionsDto } from '@js-camp/core/dtos/animeListQueryOptions.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeListQueryOptionsMapper } from '@js-camp/core/mappers/animeListQueryOptions.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';
import { map, Observable } from 'rxjs';

import { ANIME_LIST_API } from '../../constants';

import { ApiService } from './api.service';

/** Anime services. */
@Injectable({
  providedIn: 'root',
})

/** Anime services. */
export class AnimeService {

  /**
   * Anime services.
   * @param api Api methods.
   */
  public constructor(private api: ApiService) {

  }

  /**
   *  Get list of anime.
   *  @param paramsModel Query options of anime list.
   */
  public getAnimeList(paramsModel: AnimeListQueryOptions): Observable<Pagination<Anime>> {
    const paramDto = AnimeListQueryOptionsMapper.toDto(paramsModel);
    return this.api.getData<PaginationDto<AnimeDto>, AnimeListQueryOptionsDto>(ANIME_LIST_API, paramDto)
      .pipe(map(data => PaginationMapper.fromDto<AnimeDto, Anime>(data, AnimeMapper.fromDto)));
  }
}
