import { Status, Type } from '../enum/anime';
import { Immerable, OmitImmerable } from '../models/immerable';

/** Base model for date range. */
export class DateRange extends Immerable {

  /** Aired start date. */
  public readonly start: Date | null;

  /** Aired end date. */
  public readonly end: Date | null;

  public constructor(data: DateRangeInitArgs) {
    super();
    this.start = data.start;
    this.end = data.end;
  }
}

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
type DateRangeInitArgs = OmitImmerable<DateRange>;
