import { SortTitle, SortValue } from '@js-camp/core/enum';

/** Sorting info. */
export interface Sorting {

  /** Title of sorting. */
  title: SortTitle;

  /** Number of items per page. */
  value: SortValue;
}

/** Pagination option. */
export interface PaginationOptions {

  /** Number of items per page. */
  limit: number;

  /** Offset of items. */
  offset: number;

  /** Sorting type. */
  sorting: Sorting;

  /** Ordering. */
  isAscending: boolean;

  /** Ordering. */
  totalPages: number;

  /** Active page. */
  activePage: number;
}
