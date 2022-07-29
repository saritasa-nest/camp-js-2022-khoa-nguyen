import { OmitImmerable } from '../models/immerable';

import { Anime } from './anime';
import { Genre } from './genre';
import { Studio } from './studio';

/** Base model for anime. */
export class AnimeDetail extends Anime {

  /** Youtube trailer. */
  public readonly trailerYoutubeId: string | null;

  /** Airing at the moment. */
  public readonly isAiring: boolean;

  /** Synopsis. */
  public readonly synopsis: string;

  /** List studio id. */
  public readonly studioIds: readonly Studio['id'][];

  /** Studio data. */
  public readonly studios: readonly Studio[];

  /** List genres id. */
  public readonly genresIds: readonly Genre['id'][];

  /** Genre list. */
  public readonly genres: readonly Genre[];

  public constructor(data: AnimeInitArgs) {
    super(data);
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.isAiring = data.isAiring;
    this.synopsis = data.synopsis;
    this.studioIds = data.studioIds;
    this.studios = data.studios;
    this.genresIds = data.genresIds;
    this.genres = data.genres;
  }
}

type AnimeInitArgs = OmitImmerable<AnimeDetail>;
