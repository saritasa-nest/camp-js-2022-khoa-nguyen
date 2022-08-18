import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusModel, TypeModel } from '@js-camp/core/models';
import { AnimeEdit, Rating, Season, Source } from '@js-camp/core/models/animeEdit';
import { catchError, debounceTime, ignoreElements, map, merge, Observable, Subject, switchMap, takeUntil, tap, throwError } from 'rxjs';

import { AnimeService, GenreService, StudioService } from '../../../../core/services';

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

  /** Is airing control. */
  readonly isAiring: boolean;

  /** Aired start date control. */
  readonly airedStartDate: string;

  /**  Aired end date control. */
  readonly airedEndDate: string;

  /** Genres control. */
  readonly genres: readonly string[];

  /** Search genre control. */
  readonly searchGenre: string;

  /** Studio control. */
  readonly studios: readonly string[];

  /** Search studio control. */
  readonly searchStudio: string;

  /** Synopsis control. */
  readonly synopsis: string;

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
  public readonly animeInfo$: Observable<AnimeEdit> ;

  /** List of all genres. */
  public readonly listGenres$ = this.genreService.listGenres$;

  /** Toggle create button observable. */
  public readonly isShowCreateButtonGenre$ = this.genreService.isShowCreateButton$;

  /** List of all studios. */
  public readonly listStudios$ = this.studioService.listStudios$;

  /** Toggle create button observable. */
  public readonly isShowCreateButtonStudio$ = this.studioService.isShowCreateButton$;

  /** Rating list. */
  public readonly ratingList = Object.values(Rating);

  /** Season list. */
  public readonly seasonList = Object.values(Season);

  /** Source list. */
  public readonly sourceList = Object.values(Source);

  /** Status list. */
  public readonly statusList = Object.values(StatusModel).filter(item => item !== StatusModel.Default);

  /** Type list. */
  public readonly typeList = Object.values(TypeModel).filter(item => item !== TypeModel.Default);

  private readonly subscriptionManager$ = new Subject<void>();

  public constructor(
    private readonly animeService: AnimeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly genreService: GenreService,
    private readonly studioService: StudioService,
    private readonly router: Router,
  ) {

    const animeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (animeId == null || isNaN(Number(animeId))) {
      this.router.navigate(['']);
    }
    this.animeInfo$ = this.animeService.getAnimeDetail(Number(animeId))
      .pipe(
        catchError((error: unknown) => {
          this.router.navigate(['']);
          return throwError(() => error);
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
      synopsis: '',
      type: null,
      source: null,
      rating: null,
      season: null,
      genres: [],
      searchGenre: '',
      studios: [],
      searchStudio: '',
    });
  }

  /** Get search genre value. */
  public get searchGenreValue(): string {
    return this.editForm.controls['searchGenre'].value.trim();
  }

  /** Get search studio value. */
  public get searchStudioValue(): string {
    return this.editForm.controls['searchStudio'].value.trim();
  }

  /** @inheritdoc */
  public ngOnInit(): void {

    const animeInfoSideEffect$ = this.animeInfo$.pipe(
      tap(anime => {
        this.setInitValuesToAnimeForm(anime);
        this.genreService.addAnimeGenres(anime.genres.map(item => this.genreService.mapGenreToDefaultEntity(item)));
        this.studioService.addAnimeStudios(anime.studios.map(item => this.studioService.mapStudioToDefaultEntity(item)));
      }),
    );

    const genreChange$ = this.editForm.controls['genres'].valueChanges.pipe(
      map(value => this.genreService.mapperStringToDefaultEntity(value)),
      tap(value => this.genreService.addAnimeGenres(value)),
    );

    const searchGenreChange$ = this.editForm.controls['searchGenre'].valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.genreService.getGenresList(value)),
      map(genres => genres.results),
      tap(genres => {
        if (this.searchGenreValue === '') {
          this.genreService.getGenresInitList(this.subscriptionManager$).subscribe();
          this.genreService.showCreateButton();
          return;
        }
        this.genreService.addNewListGenres(genres);
        if (this.searchGenreValue.toLowerCase() === genres[0]?.name.toLowerCase()) {
          this.genreService.hideCreateButton();
          return;
        }
        this.genreService.showCreateButton();
      }),
    );

    const studioChange$ = this.editForm.controls['studios'].valueChanges.pipe(
      map(value => this.studioService.mapperStringToDefaultEntity(value)),
      tap(value => this.studioService.addAnimeStudios(value)),
    );

    const searchStudioChange$ = this.editForm.controls['searchStudio'].valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.studioService.getStudiosList(value)),
      map(studios => studios.results),
      tap(studios => {
        if (this.searchStudioValue === '') {
          this.studioService.getStudiosInitList(this.subscriptionManager$).subscribe();
          this.studioService.showCreateButton();
          return;
        }
        this.studioService.addNewListStudios(studios);
        if (this.searchStudioValue.toLowerCase() === studios[0]?.name.toLowerCase()) {
          this.studioService.hideCreateButton();
          return;
        }
        this.studioService.showCreateButton();
      }),
    );

    merge(animeInfoSideEffect$, searchGenreChange$, genreChange$, studioChange$, searchStudioChange$).pipe(
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

  /**
   * Remove genre.
   * @param item Item to remove.
   */
  public handleRemoveSelectedGenre(item: string): void {
    const currentValue: string[] = this.editForm.controls['genres'].value;
    this.editForm.controls['genres'].setValue(currentValue.filter(value => item !== value));
  }

  /**
   * Remove studio.
   * @param item Item to remove.
   */
  public handleRemoveSelectedStudio(item: string): void {
    const currentValue: string[] = this.editForm.controls['studios'].value;
    this.editForm.controls['studios'].setValue(currentValue.filter(value => item !== value));
  }

  /** Handle create new genre. */
  public handleCreateGenre(): void {
    this.genreService.createGenres(this.searchGenreValue).pipe(
      tap(() => this.editForm.controls['searchGenre'].setValue(this.searchGenreValue)),
      ignoreElements(),
      takeUntil(this.subscriptionManager$),
    )
      .subscribe();
  }

  /** Handle create new studio. */
  public handleCreateStudio(): void {
    this.studioService.createStudios(this.searchStudioValue).pipe(
      tap(() => this.editForm.controls['searchStudio'].setValue(this.searchStudioValue)),
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

}
