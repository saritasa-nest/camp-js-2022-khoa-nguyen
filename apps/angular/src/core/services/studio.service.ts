import { Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { StudioMapper, PaginationMapper } from '@js-camp/core/mappers';
import { Studio, Pagination } from '@js-camp/core/models';
import { BehaviorSubject, combineLatestWith, filter, ignoreElements, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';

import { DefaultEntity } from '../../shared/components/select-multiple/select-multiple.component';

import { ApiService } from './api.service';

/** Studio service. */
@Injectable({
  providedIn: 'root',
})
export class StudioService {

  private readonly _listStudios$ = new BehaviorSubject<readonly DefaultEntity[] | null>(null);

  /** List of all studios. */
  public readonly listStudios$ = this._listStudios$.asObservable();

  private readonly _isShowCreateButton$ = new BehaviorSubject<boolean>(true);

  /** Show create new studio or not. */
  public readonly isShowCreateButton$ = this._isShowCreateButton$.asObservable();

  private readonly currentAnimeStudios$ = new BehaviorSubject<readonly DefaultEntity[] | null>(null);

  private readonly currentListStudiosQuery$: Observable<[readonly DefaultEntity[] | null, readonly DefaultEntity[]]>;

  /**
   * Map studio to default entity.
   * @param studio Studio.
   */
  public mapStudioToDefaultEntity(studio: Studio): DefaultEntity {
    return {
      id: studio.id,
      name: studio.name,
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
    const currentAnimeStudiosObservable$ = this.currentAnimeStudios$.asObservable();
    this.currentListStudiosQuery$ = currentAnimeStudiosObservable$.pipe(
      combineLatestWith(
        this.getStudiosList('')
          .pipe(
            map(studios => studios.results.map(item => this.mapStudioToDefaultEntity(item))),
          ),
      ),
    );
  }

  /**
   *  Get list of studios.
   *  @param searchName Search input.
   */
  public getStudiosList(searchName: string): Observable<Pagination<Studio>> {
    return this.apiService.getData<PaginationDto<StudioDto>, {search: string;}>('anime/studios/', { search: searchName })
      .pipe(
        map(data => PaginationMapper.fromDto<StudioDto, Studio>(data, StudioMapper.fromDto)),
      );
  }

  /**
   * Create new studio.
   * @param name Studio name.
   */
  public createStudios(name: string): Observable<Studio> {
    const studio = { name };
    return this.apiService.postData<StudioDto, {name: string;}>('anime/studios/', studio)
      .pipe(map(data => StudioMapper.fromDto(data)));
  }

  /**
   * Add or refresh list studios.
   * @param studios List studios.
   */
  public addNewListStudios(studios: readonly Studio[]): void {
    this._listStudios$.next(studios);
  }

  /**
   * Add anime studios.
   * @param studios List studios .
   */
  public addAnimeStudios(studios: readonly DefaultEntity[]): void {
    this.currentAnimeStudios$.next(studios);
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
   *  Get studios init list.
   * @param subscriptionManager$ Subscription manager.
   */
  public getStudiosInitList(subscriptionManager$: Subject<void>): Observable<[readonly DefaultEntity[] | null, readonly DefaultEntity[]]> {
    return this.currentListStudiosQuery$.pipe(
      take(1),
      map(([currentAnimeStudios, listStudios]) => {
          const arrCombine = currentAnimeStudios?.concat(listStudios);
          const ids = arrCombine?.map(item => item.id);
          return arrCombine?.filter(({ id }, index) => !ids?.includes(id, index + 1));
        }),

      filter((value): value is Studio[] => value != null),
      tap(value => {
        this._listStudios$.next(value);
        this.hideCreateButton();
      }),
      ignoreElements(),
      takeUntil(subscriptionManager$),
    );
  }
}
