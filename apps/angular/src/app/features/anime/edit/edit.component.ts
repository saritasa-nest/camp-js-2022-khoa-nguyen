import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeEditMapper } from '@js-camp/core/mappers/animeEdit.mapper';
import { StatusModel, TypeModel } from '@js-camp/core/models';
import {
  AnimeEdit,
  Rating,
  Season,
  Source,
} from '@js-camp/core/models/animeEdit';
import { DateRange } from '@js-camp/core/models/dateRange';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  ignoreElements,
  map,
  merge,
  Observable,
  of, Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';

import {
  AnimeService,
  GenreService,
  StudioService,
} from '../../../../core/services';

interface AnimeFormControls {

  /** Anime poster control. */
  readonly imageLink: FormControl<string | null>;

  /** Trailer youtube id control. */
  readonly trailerYoutubeId: FormControl<string | null>;

  /** Title of English control. */
  readonly titleEnglish: FormControl<string>;

  /** Title of Japanese control. */
  readonly titleJapanese: FormControl<string>;

  /** Synopsis control. */
  readonly synopsis: FormControl<string>;

  /** Type control. */
  readonly type: FormControl<TypeModel>;

  /** Status control. */
  readonly status: FormControl<StatusModel>;

  /** Source control. */
  readonly source: FormControl<Source>;

  /** Season control. */
  readonly season: FormControl<Season>;

  /** Rating control. */
  readonly rating: FormControl<Rating>;

  /** Is airing. */
  readonly isAiring: FormControl<boolean>;

  /** Aired start date range. */
  readonly airedStartDate: FormControl<Date | null>;

  /** Aired end date range. */
  readonly airedEndDate: FormControl<Date | null>;

  /** Genres control. */
  readonly genres: FormControl<readonly string[]>;

  /** Genres search control. */
  readonly searchGenre: FormControl<string>;

  /** Studios control. */
  readonly studios: FormControl<readonly string[]>;

  /** Genres search control. */
  readonly searchStudio: FormControl<string>;

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
  public readonly editForm: FormGroup<AnimeFormControls>;

  /** Anime selected information. */
  public readonly animeInfo$: Observable<AnimeEdit | null>;

  /** List of all genres. */
  public readonly listGenres$ = this.genreService.listGenres$;

  /** Toggle create button observable. */
  public readonly isShowCreateButtonGenre$ =
    this.genreService.isShowCreateButton$;

  /** List of all studios. */
  public readonly listStudios$ = this.studioService.listStudios$;

  /** Toggle create button observable. */
  public readonly isShowCreateButtonStudio$ =
    this.studioService.isShowCreateButton$;

  /** Rating list. */
  public readonly ratingList = Object.values(Rating);

  /** Season list. */
  public readonly seasonList = Object.values(Season);

  /** Source list. */
  public readonly sourceList = Object.values(Source);

  /** Status list. */
  public readonly statusList = Object.values(StatusModel).filter(
    item => item !== StatusModel.Default,
  );

  /** Type list. */
  public readonly typeList = Object.values(TypeModel).filter(
    item => item !== TypeModel.Default,
  );

  /** Loading. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(true);

  /** Check if there is no anime. */
  public readonly isNullAnime$ = new BehaviorSubject<boolean>(true);

  private readonly subscriptionManager$ = new Subject<void>();

  public constructor(
    private readonly animeService: AnimeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly genreService: GenreService,
    private readonly studioService: StudioService,
    private readonly router: Router,
  ) {
    if (this.animeId != null) {
      this.isNullAnime$.next(false);
      this.animeInfo$ = this.animeService
        .getAnimeDetail(Number(this.animeId))
        .pipe(
          take(1),
          catchError((error: unknown) => {
            this.router.navigate(['']);
            return throwError(() => error);
          }),
        );
    } else {
      this.isNullAnime$.next(true);
      this.animeInfo$ = of(null);
    }
    this.editForm = new FormGroup<AnimeFormControls>({
      imageLink: new FormControl(''),
      trailerYoutubeId: new FormControl(null),
      titleEnglish: new FormControl('', { nonNullable: true }),
      titleJapanese: new FormControl('', { nonNullable: true }),
      synopsis: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      type: new FormControl(TypeModel.Default, {
        validators: Validators.required,
        nonNullable: true,
      }),
      status: new FormControl(StatusModel.Default, {
        validators: Validators.required,
        nonNullable: true,
      }),
      source: new FormControl(Source.Unknown, {
        validators: Validators.required,
        nonNullable: true,
      }),
      rating: new FormControl(Rating.Unknown, {
        validators: Validators.required,
        nonNullable: true,
      }),
      season: new FormControl(Season.NonSeasonal, {
        validators: Validators.required,
        nonNullable: true,
      }),
      isAiring: new FormControl(false, { nonNullable: true }),
      airedStartDate: new FormControl(new Date(), {
        validators: Validators.required,
        nonNullable: true,
      }),
      airedEndDate: new FormControl(new Date(), {
        validators: Validators.required,
        nonNullable: true,
      }),
      genres: new FormControl([], {
        validators: Validators.required,
        nonNullable: true,
      }),
      studios: new FormControl([], {
        validators: Validators.required,
        nonNullable: true,
      }),
      searchGenre: new FormControl('', { nonNullable: true }),
      searchStudio: new FormControl('', { nonNullable: true }),
    });
  }

  /** Get anime id. */
  public get animeId(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  /** Get search genre value. */
  public get searchGenreValue(): string {
    if (this.editForm.controls.searchGenre.value == null) {
      return '';
    }
    return this.editForm.controls.searchGenre.value.trim();
  }

  /** Get search studio value. */
  public get searchStudioValue(): string {
    if (this.editForm.controls.searchStudio.value == null) {
      return '';
    }
    return this.editForm.controls.searchStudio.value.trim();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    const animeInfoSideEffect$ = this.animeInfo$.pipe(
      tap(anime => {
        this.isLoading$.next(false);
        if (anime !== null) {
          this.setInitValuesToAnimeForm(anime);
          this.genreService.addAnimeGenres(
            anime.genres.map(item =>
              this.genreService.mapGenreToDefaultEntity(item)),
          );
          this.studioService.addAnimeStudios(
            anime.studios.map(item =>
              this.studioService.mapStudioToDefaultEntity(item)),
          );
          return;
        }
        this.genreService
          .getGenresList('')
          .pipe(
            map(genres => this.genreService.addNewListGenres(genres.results)),
            ignoreElements(),
            takeUntil(this.subscriptionManager$),
          )
          .subscribe();
        this.studioService
          .getStudiosList('')
          .pipe(
            map(studios => this.studioService.addNewListStudios(studios.results)),
            ignoreElements(),
            takeUntil(this.subscriptionManager$),
          )
          .subscribe();
      }),
    );

    const genreChange$ = this.editForm.controls.genres.valueChanges.pipe(
      map(value => this.genreService.mapperStringToDefaultEntity(value)),
      tap(value => this.genreService.addAnimeGenres(value)),
    );

    const searchGenreChange$ =
      this.editForm.controls.searchGenre.valueChanges.pipe(
        debounceTime(500),
        switchMap(value => this.genreService.getGenresList(value)),
        map(genres => genres.results),
        tap(genres => {
          if (this.searchGenreValue === '') {
            this.genreService
              .getGenresInitList(this.subscriptionManager$)
              .subscribe();
            this.genreService.showCreateButton();
            return;
          }
          this.genreService.addNewListGenres(genres);
          if (
            this.searchGenreValue.toLowerCase() ===
            genres[0]?.name.toLowerCase()
          ) {
            this.genreService.hideCreateButton();
            return;
          }
          this.genreService.showCreateButton();
        }),
      );

    const studioChange$ = this.editForm.controls.studios.valueChanges.pipe(
      map(value => this.studioService.mapperStringToDefaultEntity(value)),
      tap(value => this.studioService.addAnimeStudios(value)),
    );

    const searchStudioChange$ =
      this.editForm.controls.searchStudio.valueChanges.pipe(
        debounceTime(300),
        switchMap(value => this.studioService.getStudiosList(value)),
        map(studios => studios.results),
        tap(studios => {
          if (this.searchStudioValue === '') {
            this.studioService
              .getStudiosInitList(this.subscriptionManager$)
              .subscribe();
            this.studioService.showCreateButton();
            return;
          }
          this.studioService.addNewListStudios(studios);
          if (
            this.searchStudioValue.toLowerCase() ===
            studios[0]?.name.toLowerCase()
          ) {
            this.studioService.hideCreateButton();
            return;
          }
          this.studioService.showCreateButton();
        }),
      );

    merge(
      animeInfoSideEffect$,
      searchGenreChange$,
      genreChange$,
      studioChange$,
      searchStudioChange$,
    )
      .pipe(ignoreElements(), takeUntil(this.subscriptionManager$))
      .subscribe();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscriptionManager$.next();
    this.subscriptionManager$.complete();
  }

  /**
   * Remove genre.
   * @param item Item to remove.
   */
  public handleRemoveSelectedGenre(item: string): void {
    const currentValue = this.editForm.controls.genres.value;
    this.editForm.controls.genres.setValue(
      currentValue.filter(value => item !== value),
    );
  }

  /**
   * Remove studio.
   * @param item Item to remove.
   */
  public handleRemoveSelectedStudio(item: string): void {
    const currentValue = this.editForm.controls.studios.value;
    this.editForm.controls.studios.setValue(
      currentValue.filter(value => item !== value),
    );
  }

  /** Handle create new genre. */
  public handleCreateGenre(): void {
    this.genreService
      .createGenres(this.searchGenreValue)
      .pipe(
        tap(() =>
          this.editForm.controls.searchGenre.setValue(this.searchGenreValue)),
        ignoreElements(),
        takeUntil(this.subscriptionManager$),
      )
      .subscribe();
  }

  /** Handle create new studio. */
  public handleCreateStudio(): void {
    this.studioService
      .createStudios(this.searchStudioValue)
      .pipe(
        tap(() =>
          this.editForm.controls.searchStudio.setValue(this.searchStudioValue)),
        ignoreElements(),
        takeUntil(this.subscriptionManager$),
      )
      .subscribe();
  }

  private setInitValuesToAnimeForm(anime: AnimeEdit): void {
    this.editForm.patchValue({
      titleJapanese: anime.titleJapan,
      titleEnglish: anime.titleEnglish,
      imageLink: anime.image,
      trailerYoutubeId: anime.trailerYoutubeId,
      airedStartDate: anime.aired.start,
      airedEndDate: anime.aired.end,
      synopsis: anime.synopsis,
      isAiring: anime.isAiring,
      status: anime.status,
      type: anime.type,
      source: anime.source,
      rating: anime.rating,
      season: anime.season,
      genres: anime.genres.map(item => `${item.id}-${item.name}`),
      searchGenre: '',
      studios: anime.studios.map(item => `${item.id}-${item.name}`),
      searchStudio: '',
    });
  }

  /** On form submit. */
  public onSubmit(): void {
    const rawValue = this.editForm.getRawValue();
    if (!this.editForm.valid) {
      return;
    }
    const animeEditModel = new AnimeEdit({
      image: rawValue.imageLink,
      trailerYoutubeId: rawValue.trailerYoutubeId,
      titleEnglish: rawValue.titleEnglish,
      titleJapan: rawValue.titleJapanese,
      synopsis: rawValue.synopsis,
      type: rawValue.type,
      status: rawValue.status,
      source: rawValue.source,
      rating: rawValue.rating,
      season: rawValue.season,
      isAiring: rawValue.isAiring,
      aired: new DateRange({
        start: rawValue.airedStartDate,
        end: rawValue.airedEndDate,
      }),
      genresIds: rawValue.genres.map((item: string) =>
        Number(item.split('-')[0])),
      studioIds: rawValue.studios.map((item: string) =>
        Number(item.split('-')[0])),
      genres: [],
      studios: [],
      id: 1,
    });

    const animeEditDto = AnimeEditMapper.toDto(animeEditModel);
    if (this.animeId == null) {
      this.animeService
        .createAnime(animeEditDto)
        .pipe(
          tap(anime => this.router.navigate([`detail/${anime.id}`])),
          ignoreElements(),
          takeUntil(this.subscriptionManager$),
        )
        .subscribe();
      return;
    }
    this.animeService
      .editAnime(Number(this.animeId), animeEditDto)
      .pipe(
        tap(anime => this.router.navigate([`detail/${anime.id}`])),
        ignoreElements(),
        takeUntil(this.subscriptionManager$),
      )
      .subscribe();
  }
}
