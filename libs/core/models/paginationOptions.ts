
import { Type } from '../enum';

import { Immerable, OmitImmerable } from './immerable';
import { Sorting } from './sorting';

/** Pagination meta info. */
export class PaginationOptions extends Immerable {

  /** Total count of items. */
  public readonly offset: number;

  /** Next page of items. */
  public readonly limit: number;

  /** Sorting options. */
  public readonly sorting: Sorting;

  /** Total pages of data. */
  public readonly totalPages: number;

  /** Active page. */
  public readonly activePage: number;

  /** Filter by type. */
  public readonly type: Type;

  public constructor(data: InitArgsPagination) {
    super();
    this.offset = data.offset;
    this.limit = data.limit;
    this.sorting = data.sorting;
    this.totalPages = data.totalPages;
    this.activePage = data.activePage;
    this.type = data.type;
  }
}

type InitArgsPagination = OmitImmerable<PaginationOptions>;