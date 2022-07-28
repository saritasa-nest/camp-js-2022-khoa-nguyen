
/** Pagination meta info. */
export interface AnimeListQueryOptionsDto {

  /** Offset of page. */
  readonly offset: number;

  /** Total items per page. */
  readonly limit: number;

  /** Sorting options. */
  readonly ordering: string;

  /** Search items by name. */
  readonly search: string;
}
