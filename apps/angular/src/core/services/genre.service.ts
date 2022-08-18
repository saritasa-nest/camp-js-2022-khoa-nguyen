import { Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { PaginationMapper, GenreMapper } from '@js-camp/core/mappers';
import { Pagination, Genre } from '@js-camp/core/models';
import { Observable, map, BehaviorSubject } from 'rxjs';

import { DefaultEntity } from '../../shared/components/select-multiple/select-multiple.component';

import { ApiService } from './api.service';

interface CreateGenre {

  /** Name of genre. */
  name: string;

  /** Type of genre. */
  type: 'GENRES';
}

/** Genre service. */
@Injectable({
  providedIn: 'root',
})
export class GenreService {

  /** List of all genres. */
  public readonly listGenres$ = new BehaviorSubject<readonly DefaultEntity[] | null>(null);

  private readonly currentAnimeGenres$ = new BehaviorSubject<readonly DefaultEntity[] | null>(null);

  private readonly currentListGenresQuery$: Observable<[readonly DefaultEntity[] | null, readonly DefaultEntity[]]>;

  public constructor(private readonly apiService: ApiService) {
    const currentAnimeGenresObservable$ = this.currentAnimeGenres$.asObservable();
    this.currentListGenresQuery$ = currentAnimeGenresObservable$.pipe(
      combineLatestWith(
        this
          .getGenresList('')
          .pipe(
            map(genres => genres.results.map(item => this.mapper(item))),
          ),
      ),
    );
  }

  /**
   *  Get list of genres.
   *  @param searchName Search input.
   */
  public getGenresList(searchName: string): Observable<Pagination<Genre>> {
    return this.apiService.getData<PaginationDto<GenreDto>, {search: string;}>('anime/genres/', { search: searchName })
      .pipe(map(data => PaginationMapper.fromDto<GenreDto, Genre>(data, GenreMapper.fromDto)));
  }

  /**
   * Create new genre.
   * @param name Genre name.
   */
  public createGenres(name: string): Observable<Genre> {

    const genre: CreateGenre = { name, type: 'GENRES' };
    return this.apiService.postData<GenreDto, CreateGenre>('anime/genres/', genre)
      .pipe(map(data => GenreMapper.fromDto(data)));
  }
}
