import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Genre, StatusModel, TypeModel } from '@js-camp/core/models';
import { AnimeEdit, Rating, Season, Source } from '@js-camp/core/models/animeEdit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DefaultEntity } from 'apps/angular/src/shared/components/select-multiple/select-multiple.component';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { AnimeService } from '../../../../core/services';

/** Edit anime page. */
@Component({
  selector: 'camp-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  /** Register form init. */
  public readonly editForm$: Observable<FormGroup>;

  /** Anime selected information. */
  public readonly animeInfo$: Observable<AnimeEdit> | null;

  /** List of all genres. */
  public readonly listGenres$: Observable<readonly Genre[]>;

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

  /** Selected genres. */
  public readonly selectedGenres$ = new BehaviorSubject<readonly DefaultEntity[] | null>(null);

  /**
   * Mapper.
   * @param model Genre model.
   */
  public mapper(model: Genre): DefaultEntity {
    return {
      id: model.id,
      name: model.name,
    };
  }

  public constructor(
    private readonly animeService: AnimeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
  ) {

    const animeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (animeId == null || isNaN(Number(animeId))) {
      this.animeInfo$ = null;
    }
    this.animeInfo$ = this.animeService.getAnimeDetail(Number(animeId));

    this.listGenres$ = this.animeService
      .getGenresList()
      .pipe(
        map(genres => genres.results),
      );

    this.editForm$ = this.animeInfo$.pipe(
      tap(anime => this.selectedGenres$.next(anime.genres.map(item => this.mapper(item)))),
      map(anime =>
        this.formBuilder.group({
          titleJapanese: [anime.titleJapan],
          titleEnglish: [anime.titleEnglish],
          imageLink: [anime.image],
          trailerYoutubeId: [anime.trailerYoutubeId],
          airedStartDate: [anime.aired.start],
          airedEndDate: [anime.aired.end],
          isAiring: [anime.isAiring],
          status: [anime.status],
          type: [anime.type],
          source: [anime.source],
          rating: [anime.rating],
          season: [anime.season],
          genres: [anime.genres.map(item => item.name)],
          searchGenre: [''],
        })),
    );

  }
}
