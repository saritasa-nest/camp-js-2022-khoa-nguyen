import { TypeDto } from '@js-camp/core/dtos';
import { SortValue } from '@js-camp/core/models';

/** Options of ordering.. */
export enum OrderOption {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

/** Anime query URL. */
export interface QueryUrl {

  /** Current page of pagination. */
  readonly page?: number;

  /** Filter by type in anime table. */
  readonly type?: string;

  /** Ordering options. */
  readonly ordering?: OrderOption;

  /** Search value. */
  readonly search?: string | null;

  /** Sort by option. */
  readonly sortBy?: SortValue;

  /** Items per page. */
  readonly limit?: number;

}

/** Anime query URL. */
export interface SettingOfAnimeList {

  /** Current page of pagination. */
  readonly page?: number;

  /** Filter by type in anime table. */
  readonly type?: TypeDto[];

  /** Ordering options. */
  readonly ordering?: OrderOption;

  /** Search value. */
  readonly search?: string;

  /** Sort by option. */
  readonly sortBy?: SortValue;

  /** Items per page. */
  readonly limit?: number;

}

export namespace SearchParamsService {

}
