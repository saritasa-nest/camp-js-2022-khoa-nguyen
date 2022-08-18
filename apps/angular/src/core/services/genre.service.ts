import { Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { PaginationMapper, GenreMapper } from '@js-camp/core/mappers';
import { Pagination, Genre } from '@js-camp/core/models';
import { Observable, map } from 'rxjs';

import { ApiService } from './api.service';

/** Genre service. */
@Injectable({
  providedIn: 'root',
})
export class GenreService {

  public constructor(private readonly apiService: ApiService) { }

  /**
   *  Get list of anime.
   *  @param searchName Search input.
   */
  public getGenresList(searchName: string): Observable<Pagination<Genre>> {
    return this.apiService.getData<PaginationDto<GenreDto>, {search: string;}>('anime/genres/', { search: searchName })
      .pipe(map(data => PaginationMapper.fromDto<GenreDto, Genre>(data, GenreMapper.fromDto)));
  }
}
