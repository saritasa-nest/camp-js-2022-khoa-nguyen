import { Type, Status } from '../enum/anime';

export interface DateRangeDto {

  /** Start date. */
  readonly start: string;

  /** End date. */
  readonly end: string;
}

/** Anime data interface. */
export interface AnimeDto {

  /** Anime ID. */
  readonly id: number;

  /** Date created. */
  readonly created: number;

  /** Date modified. */
  readonly modified: string;

  /** English title. */
  readonly title_eng: string;

  /** Japanese title. */
  readonly title_jpn: string;

  /** Thumbnail of anime. */
  readonly image: string;

  /** Aired date. */
  readonly aired: DateRangeDto;

  /** Anime type. */
  readonly type: Type;

  /** Status of anime. */
  readonly status: Status;
}
