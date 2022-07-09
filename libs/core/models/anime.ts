import { Status, Type } from '../enum/anime';
import { Immerable, OmitImmerable } from '../models/immerable';

import { DateRange } from './dateRange';

/** Base model for anime. */
export class Anime extends Immerable {

  /** Id. */
  public readonly id: number;

  /** English title. */
  public readonly titleEnglish: string;

  /** Japan title. */
  public readonly titleJapan: string;

  /** Image. */
  public readonly image: string;

  /** Aired start. */
  public readonly aired: DateRange;

  /** Type. */
  public readonly type: Type;

  /** Status. */
  public readonly status: Status;

  public constructor(data: AnimeInitArgs) {
    super();
    this.id = data.id;
    this.titleEnglish = data.titleEnglish;
    this.titleJapan = data.titleJapan;
    this.image = data.image;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
  }
}

type AnimeInitArgs = OmitImmerable<Anime>;
