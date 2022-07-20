
import { Immerable, OmitImmerable } from './immerable';

/** Sorting value. */
export enum SortValue {
  TitleEnglish = 'title_eng',
  AiredStartDate = 'aired__startswith',
  Status = 'status',
}

/** Sorting title. */
export enum SortTitle {
  TitleEnglish = 'Title English',
  AiredStartDate = 'Aired start date',
  Status = 'Status',
}

/** Sorting. */
export class Sorting extends Immerable {

  /** Title of sorting. */
  public readonly title: SortTitle;

  /** Name of sorting. */
  public readonly value: SortValue;

  /** Ordering. */
  public readonly isAscending: boolean;

  public constructor(data: PostInitArgs) {
    super();
    this.title = data.title;
    this.value = data.value;
    this.isAscending = data.isAscending;
  }
}

type PostInitArgs = OmitImmerable<Sorting>;
