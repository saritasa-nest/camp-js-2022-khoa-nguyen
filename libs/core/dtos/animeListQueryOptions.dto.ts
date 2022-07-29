import { TypeDto } from './anime.dto';

/** Pagination meta info. */
export interface AnimeListQueryOptionsDto {

  /** Offset of page. */
  readonly offset: number;

  /** Total items per page. */
  readonly limit: number;

  /** Sorting options. */
  readonly ordering: string;

  /** Filter by types. */
  readonly type?: TypeDto;

  /** Search items by name. */
  readonly search?: string;
}
