import { OrderingQuery } from '../models/animeQuery';

import { TypeDto } from './anime.dto';

export enum SortingQueryDto {
  TitleEng = 'title_eng',
  Status = 'status',
}

type OrderingQueryDesDto = `-${SortingQueryDto}`;
type OrderingQueryAscDto = `${SortingQueryDto}`;
type OrderingQueryDto = OrderingQueryDesDto | OrderingQueryAscDto;

/** Anime query info. */
export interface AnimeQueryDto {

  /** Ordering options. */
  readonly ordering?: OrderingQueryDto;

  /** Search items by name. */
  readonly search?: string;

  /** Types of anime list. */
  readonly type__in?: readonly TypeDto[];

}

export type SortingQueryUrl = SortingQueryDto;
export type OrderingQueryUrl = OrderingQuery;
export type TypeQueryUrl = TypeDto;

/** Anime query info. */
export interface AnimeQueryUrl {

  /** Sorting options. */
  readonly sorting?: SortingQueryUrl;

  /** Ordering options. */
  readonly ordering?: OrderingQueryUrl;

  /** Types of anime list. */
  readonly types?: readonly TypeQueryUrl[];

  /** Search query of anime list. */
  readonly search?: string;

}
