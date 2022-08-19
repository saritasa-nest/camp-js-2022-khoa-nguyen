import { Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { GenreMapper, PaginationMapper } from '@js-camp/core/mappers';
import { Genre, Pagination } from '@js-camp/core/models';
import { BehaviorSubject, combineLatestWith, filter, ignoreElements, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';

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

  private readonly _listGenres$ = new BehaviorSubject<readonly DefaultEntity[] | null>(null);

  /** List of all genres. */
  public readonly listGenres$ = this._listGenres$.asObservable();

  private readonly _isShowCreateButton$ = new BehaviorSubject<boolean>(true);

  /** Show create new genre or not. */
  public readonly isShowCreateButton$ = this._isShowCreateButton$.asObservable();

  private readonly currentAnimeGenres$ = new BehaviorSubject<readonly DefaultEntity[] | null>(null);

  private readonly currentListGenresQuery$: Observable<[readonly DefaultEntity[] | null, readonly DefaultEntity[]]>;

  /**
   * Map genre to default entity.
   * @param genre Genre.
   */
  public mapGenreToDefaultEntity(genre: Genre): DefaultEntity {
    return {
      id: genre.id,
      name: genre.name,
    };
  }

  /**
   * Map list of string to default entity.
   * @param arr Array of string.
   */
  public mapperStringToDefaultEntity(arr: readonly string[]): readonly DefaultEntity[] {
    return arr.map(item => {
      const arrSpilt = item.split('-');
      return {
        id: Number(arrSpilt[0]),
        name: arrSpilt[1],
      };
    });
  }

  public constructor(private readonly apiService: ApiService) {
    const currentAnimeGenresObservable$ = this.currentAnimeGenres$.asObservable();
    this.currentListGenresQuery$ = currentAnimeGenresObservable$.pipe(
      combineLatestWith(
        this.getGenresList('')
          .pipe(
            map(genres => genres.results.map(item => this.mapGenreToDefaultEntity(item))),
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

  /**
   * Add or refresh list genres.
   * @param genres List genres.
   */
  public addNewListGenres(genres: readonly DefaultEntity[]): void {
    this._listGenres$.next(genres);
  }

  /**
   * Add anime genres.
   * @param genres List genres .
   */
  public addAnimeGenres(genres: readonly DefaultEntity[]): void {
    this.currentAnimeGenres$.next(genres);
  }

  /** Show create button. */
  public showCreateButton(): void {
    this._isShowCreateButton$.next(true);
  }

  /** Hide create button. */
  public hideCreateButton(): void {
    this._isShowCreateButton$.next(false);
  }

  /**
   *  Get genres init list.
   * @param subscriptionManager$ Subscription manager.
   */
  public getGenresInitList(subscriptionManager$: Subject<void>): Observable<[readonly DefaultEntity[] | null, readonly DefaultEntity[]]> {
    return this.currentListGenresQuery$.pipe(
      take(1),
      map(([currentAnimeGenres, listGenres]) => {
          const arrCombine = currentAnimeGenres?.concat(listGenres);
          const ids = arrCombine?.map(item => item.id);
          return arrCombine?.filter(({ id }, index) => !ids?.includes(id, index + 1));
        }),

      filter((value): value is Genre[] => value != null),
      tap(value => {
        this._listGenres$.next(value);
        this.hideCreateButton();
      }),
      ignoreElements(),
      takeUntil(subscriptionManager$),
    );
  }
}
