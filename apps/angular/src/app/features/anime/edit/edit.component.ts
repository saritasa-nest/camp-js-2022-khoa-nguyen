import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Genre, StatusModel, TypeModel } from '@js-camp/core/models';
import { AnimeEdit, Rating, Season, Source } from '@js-camp/core/models/animeEdit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DefaultEntity } from 'apps/angular/src/shared/components/select-multiple/select-multiple.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

import { BehaviorSubject, combineLatestWith, debounceTime, filter, ignoreElements, map, merge, Observable, Subject, switchMap, take, takeUntil, tap } from 'rxjs';

import { AnimeService, GenreService } from '../../../../core/services';

/** Anime poster control. */
export interface AnimeFormControls {

  /** Anime poster control. */
  readonly imageLink: string | null;

  /** Trailer youtube id control. */
  readonly trailerYoutubeId: string | null;

  /** Title of English control. */
  readonly titleEnglish: string;

  /** Title of Japanese control. */
  readonly titleJapanese: string;

  /** Type control. */
  readonly type: TypeModel | null;

  /** Status control. */
  readonly status: StatusModel | null;

  /** Source control. */
  readonly source: Source | null;

  /** Season control. */
  readonly season: Season | null;

  /** Rating control. */
  readonly rating: Rating | null;

  /** Is airing. */
  readonly isAiring: boolean;

  /** Genres control. */
  readonly genres: readonly string[];

  /** Genres control. */
  readonly airedStartDate: string;

  /** Genres control. */
  readonly airedEndDate: string;

  /** Genres control. */
  readonly searchGenre: string;

}

/** Edit anime page. */
@Component({
  selector: 'camp-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit, OnDestroy {
  /** Register form init. */
  public readonly editForm: FormGroup;

  /** Anime selected information. */
  public readonly animeInfo$: Observable<AnimeEdit> | null;

  /** List of all genres. */
  public readonly listGenres$ = new BehaviorSubject<readonly DefaultEntity[] | null>(null);

  /** Rating list. */
  public readonly ratingList = Object.values(Rating);

  /** Season list. */
  public readonly seasonList = Object.values(Season);

  /** Season source. */
  public readonly sourceList = Object.values(Source);

  /** Season source. */
  public readonly statusList = Object.values(StatusModel);

  /** Season source. */
  public readonly typeList = Object.values(TypeModel);

  /** Subject that is used for unsubscribing from streams. */
  private readonly subscriptionManager$ = new Subject<void>();

  private readonly currentAnimeGenres$ = new BehaviorSubject<readonly DefaultEntity[] | null>(null);

  private readonly currentListGenresQuery$: Observable<[readonly DefaultEntity[] | null, readonly DefaultEntity[]]>;

  private mapper(genre: Genre): DefaultEntity {
    return {
      id: genre.id,
      name: genre.name,
    };
  }

  public constructor(
    private readonly animeService: AnimeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly genreService: GenreService,
  ) {

    const animeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (animeId == null || isNaN(Number(animeId))) {
      this.animeInfo$ = null;
    }
    this.animeInfo$ = this.animeService
      .getAnimeDetail(Number(animeId))
      .pipe(
        tap(anime => {
          this.setInitValuesToAnimeForm(anime);
          this.currentAnimeGenres$.next(anime.genres.map(item => this.mapper(item)));
        }),
      );

    this.editForm = this.formBuilder.group<AnimeFormControls>({
      titleJapanese: '',
      titleEnglish: '',
      imageLink: '',
      trailerYoutubeId: '',
      airedStartDate: '',
      airedEndDate: '',
      isAiring: false,
      status: null,
      type: null,
      source: null,
      rating: null,
      season: null,
      genres: [],
      searchGenre: '',
    });

    const currentAnimeGenresObservable$ = this.currentAnimeGenres$.asObservable();

    this.currentListGenresQuery$ = currentAnimeGenresObservable$.pipe(
      combineLatestWith(
        this.genreService
          .getGenresList('')
          .pipe(
            map(genres => genres.results.map(item => this.mapper(item))),
          ),
      ),
    );

  }

  private mapperStringToDefaultEntity(arr: readonly string[]): readonly DefaultEntity[] {
    return arr.map(item => {
      const arrSpilt = item.split('-');
      return {
        id: Number(arrSpilt[0]),
        name: arrSpilt[1],
      };
    });
  }

  /** Get genres init list. */
  public getGenresInitList(): void {
    this.currentListGenresQuery$.pipe(
      take(1),
      map(([currentAnimeGenres, listGenres]) => {
        const arrCombine = currentAnimeGenres?.concat(listGenres);
        const ids = arrCombine?.map(item => item.id);
        return arrCombine?.filter(({ id }, index) => !ids?.includes(id, index + 1));
      }),

      filter((value): value is Genre[] => value != null),
      tap(value => this.listGenres$.next(value)),
      ignoreElements(),
      takeUntil(this.subscriptionManager$),
    ).subscribe();
  }

  /** @inheritdoc */
  public ngOnInit(): void {

    const searchGenreChange$ = this.editForm.controls['searchGenre'].valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.genreService.getGenresList(value)),
      map(genres => genres.results),
      tap(genres => {
        if (this.editForm.controls['searchGenre'].value === '') {
          this.getGenresInitList();
          return;
        }
        this.listGenres$.next(genres);
      }),
    );

    const genreChange$ = this.editForm.controls['genres'].valueChanges.pipe(
      map(value => this.mapperStringToDefaultEntity(value)),
      tap(value => this.currentAnimeGenres$.next((value))),
    );

    merge(searchGenreChange$, genreChange$).pipe(
      ignoreElements(),
      takeUntil(this.subscriptionManager$),
    )
      .subscribe();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscriptionManager$.next();
    this.subscriptionManager$.complete();
  }

  private setInitValuesToAnimeForm(anime: AnimeEdit): void {
    this.editForm.patchValue({
      titleJapanese: anime.titleJapan,
      titleEnglish: anime.titleEnglish,
      imageLink: anime.image,
      trailerYoutubeId: anime.trailerYoutubeId,
      airedStartDate: anime.aired.start,
      airedEndDate: anime.aired.end,
      isAiring: anime.isAiring,
      status: anime.status,
      type: anime.type,
      source: anime.source,
      rating: anime.rating,
      season: anime.season,
      genres: anime.genres.map(item => `${item.id}-${item.name}`),
      searchGenre: '',
    });
  }

  /**
   * Remove entity.
   * @param item Item to remove.
   */
  public handleRemoveSelectedValue(item: string): void {
    const currentValue: string[] = this.editForm.controls['genres'].value;
    this.editForm.controls['genres'].setValue(currentValue.filter(value => item !== value));
  }

  /** Handle create new genre. */
  public handleCreateGenre(): void {
    const nameGenre = this.editForm.controls['searchGenre'].value;
    this.genreService.createGenres(nameGenre).pipe(
      tap(() => this.editForm.controls['searchGenre'].setValue(nameGenre)),
      ignoreElements(),
      takeUntil(this.subscriptionManager$),
    )
      .subscribe();
  }

}
