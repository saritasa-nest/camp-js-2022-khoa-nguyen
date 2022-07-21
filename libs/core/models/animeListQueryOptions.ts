import { Immerable, OmitImmerable } from './immerable';
import { Sorting } from './sorting';

/** Pagination meta info. */
export class AnimeListQueryOptions extends Immerable {

  /** Total count of items. */
  public readonly offset: number;

  /** Next page of items. */
  public readonly limit: number;

  /** Previous page of items. */
  public readonly sorting: Sorting;

  /** Total pages of data. */
  public readonly totalPages: number;

  /** Search items by name. */
  public readonly search: string;

  /** Active page. */
  public readonly activePage: number;

  public constructor(data: InitArgsPagination) {
    super();
    this.offset = data.offset;
    this.limit = data.limit;
    this.sorting = data.sorting;
    this.totalPages = data.totalPages;
    this.activePage = data.activePage;
    this.search = data.search;
  }
}

type InitArgsPagination = OmitImmerable<AnimeListQueryOptions>;
