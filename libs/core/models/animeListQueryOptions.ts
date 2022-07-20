
import { TypeModel } from './anime';
import { Immerable, OmitImmerable } from './immerable';
import { Sorting } from './sorting';

/** Pagination meta info. */
export class AnimeListQueryOptions extends Immerable {

  /** Total count of items. */
  public readonly offset: number;

  /** Next page of items. */
  public readonly limit: number;

  /** Sorting options. */
  public readonly sorting: Sorting;

  /** Total pages of data. */
  public readonly totalPages: number;

  /** Search items by name. */
  public readonly search: string;

  /** Active page. */
  public readonly activePage: number;

  /** Filter by type. */
  public readonly type: TypeModel;

  public constructor(data: InitArgsPagination) {
    super();
    this.offset = data.offset;
    this.limit = data.limit;
    this.sorting = data.sorting;
    this.totalPages = data.totalPages;
    this.activePage = data.activePage;
    this.type = data.type;
    this.search = data.search;
  }
}

type InitArgsPagination = OmitImmerable<AnimeListQueryOptions>;
