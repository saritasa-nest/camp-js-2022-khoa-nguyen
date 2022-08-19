import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models';
import { map, Observable, Subject } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

/** Detail of anime selected. */
@Component({
  selector: 'camp-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {

  /** Anime selected information. */
  public readonly animeInfo$: Observable<AnimeDetail> | null;

  /** Trigger show popup image or not. */
  public readonly isShowPopupImage$ = new Subject<boolean>();

  /** Trigger show popup trailer or not. */
  public readonly isShowPopupTrailer$ = new Subject<boolean>();

  /** Anime trailer. */
  public readonly animeTrailer$: Observable<SafeResourceUrl>;

  public constructor(
    private readonly animeService: AnimeService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {

    if (this.animeId == null || isNaN(Number(this.animeId))) {
      this.animeInfo$ = null;
    }
    this.animeInfo$ = this.animeService.getAnimeDetail(Number(this.animeId));

    this.animeTrailer$ = this.animeInfo$.pipe(
      map(anime => {
        const animeTrailer = `https://www.youtube.com/embed/${anime.trailerYoutubeId}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(animeTrailer);
      }),
    );
  }

  /** Get anime id. */
  public get animeId(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  /** Open popup image. */
  public handleOpenImage(): void {
    this.isShowPopupImage$.next(true);
  }

  /** Open popup image. */
  public handleOpenTrailer(): void {
    this.isShowPopupTrailer$.next(true);
  }

  /** Close popup image. */
  public handleCloseImage(): void {
    this.isShowPopupImage$.next(false);
  }

  /** Open popup trailer. */
  public handleCloseTrailer(): void {
    this.isShowPopupTrailer$.next(false);
  }

  /** Handle move to edit page of anime. */
  public handleEditAnime(): void {
    this.router.navigate([`edit/${this.animeId}`]);
  }
}
