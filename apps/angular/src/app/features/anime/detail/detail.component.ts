import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models';
import { BehaviorSubject, Observable } from 'rxjs';

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
  public readonly isShowPopupImage$ = new BehaviorSubject<boolean>(false);

  /** Trigger show popup trailer or not. */
  public readonly isShowPopupTrailer$ = new BehaviorSubject<boolean>(false);

  public constructor(
    private readonly animeService: AnimeService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    const animeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (animeId == null || isNaN(Number(animeId))) {
      this.animeInfo$ = null;
    }
    this.animeInfo$ = this.animeService.getAnimeDetail(Number(animeId));
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
}
