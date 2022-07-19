import { OmitImmerable } from '../models/immerable';

import { Anime } from './anime';
import { Genre } from './genre';
import { Studio } from './studio';

/** Base model for anime. */
export class AnimeDetail extends Anime {

  /** Youtube trailer. */
  public readonly trailerYoutubeId: string | null;

  /** Airing at the moment. */
  public readonly airing: boolean;

  /** Synopsis. */
  public readonly synopsis: string;

  /** List studio id. */
  public readonly studios: readonly number[];

  /** Studio data. */
  public readonly studiosData: readonly Studio[];

  /** List genres id. */
  public readonly genres: readonly number[];

  /** Genre list. */
  public readonly genresData: readonly Genre[];

  public constructor(data: AnimeInitArgs) {
    super(data);
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.airing = data.airing;
    this.synopsis = data.synopsis;
    this.studios = data.studios;
    this.studiosData = data.studiosData;
    this.genres = data.genres;
    this.genresData = data.genresData;
  }
}

type AnimeInitArgs = OmitImmerable<AnimeDetail>;
