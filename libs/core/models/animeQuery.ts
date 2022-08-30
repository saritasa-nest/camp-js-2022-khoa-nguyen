import { Immerable, OmitImmerable } from '../models/immerable';

import { TypeModel } from './anime';

/** Sorting query. */
export enum SortingQuery {
  TitleEng = 'Title English',
  Status = 'Status',
}

/** Ordering query. */
export enum OrderingQuery {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

/** Base model for date range. */
export class AnimeQuery extends Immerable {

  /** Sorting options. */
  public readonly sorting?: SortingQuery;

  /** Ordering options. */
  public readonly ordering?: OrderingQuery;

  /** Types of anime list. */
  public readonly types?: readonly TypeModel[];

  /** Search query of anime list. */
  public readonly search?: string;

  public constructor(data: DateRangeInitArgs) {
    super();
    this.sorting = data.sorting;
    this.ordering = data.ordering;
    this.types = data.types;
    this.search = data.search;
  }
}

type DateRangeInitArgs = OmitImmerable<AnimeQuery>;
