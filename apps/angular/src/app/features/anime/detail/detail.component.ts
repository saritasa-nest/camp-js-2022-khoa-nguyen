import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models';
import { Observable } from 'rxjs';

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

}
