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

type DateRangeInitArgs = OmitImmerable<DateRange>;
