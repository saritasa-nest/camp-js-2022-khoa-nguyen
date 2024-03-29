import { SortTitle, SortValue } from '../enum';

import { Immerable, OmitImmerable } from './immerable';

/** Sorting. */
export class Sorting extends Immerable {

  /** Title of sorting. */
  public readonly title: SortTitle;

  /** API value of sorting. */
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
