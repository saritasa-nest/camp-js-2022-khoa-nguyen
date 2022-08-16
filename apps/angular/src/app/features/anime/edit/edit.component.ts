import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetail, Genre, Pagination } from '@js-camp/core/models';

import { map, Observable } from 'rxjs';

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
  public readonly animeInfo$: Observable<AnimeDetail> | null;

  /** List of all genres. */
  public readonly listGenres$: Observable<Pagination<Genre>>;

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

    this.listGenres$ = this.animeService.getGenresList();

    this.editForm$ = this.animeInfo$.pipe(
      map(anime =>
        this.formBuilder.group({
          titleJapanese: [anime.titleJapan],
          titleEnglish: [anime.titleEnglish],
          imageLink: [anime.image],
          trailerYoutubeId: [anime.trailerYoutubeId],
          airedStartDate: [anime.aired.start?.toDateString()],
          airedEndDate: [anime.aired.end?.toDateString()],
          isAiring: [anime.isAiring],
        })),
    );

  }
}
