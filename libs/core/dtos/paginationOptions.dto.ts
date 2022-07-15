import { Type } from '../enum';

/** Pagination meta info. */
export interface PaginationOptionsDto {

  /** Offset of page. */
  readonly offset: number;

  /** Total items per page. */
  readonly limit: number;

  /** Sorting options. */
  readonly ordering: string;

  /** Filter by types. */
  readonly type: Type;
}