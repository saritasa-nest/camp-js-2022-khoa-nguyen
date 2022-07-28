
import { Immerable, OmitImmerable } from './immerable';
import { Sorting } from './sorting';

/** Pagination meta info. */
export class AnimeListQueryOptions extends Immerable {

  /** Offset of items. */
  public readonly offset: number;

  /** Limit of items. */
  public readonly limit: number;

  /** Sorting options of items. */
  public readonly sorting: Sorting;

  /** Total pages of data. */
  public readonly totalPages: number;

  /** Active page. */
  public readonly activePage: number;

  public constructor(data: InitArgsPagination) {
    super();
    this.offset = data.offset;
    this.limit = data.limit;
    this.sorting = data.sorting;
    this.totalPages = data.totalPages;
    this.activePage = data.activePage;
  }
}

type InitArgsPagination = OmitImmerable<AnimeListQueryOptions>;
