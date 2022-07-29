import { DateRangeDto } from './dateRange.dto';

/** Anime type dto. */
export enum TypeDto {
  Ona = 'ONA',
  Tv = 'TV',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Music = 'MUSIC',
  Ova = 'OVA',
  Default = '',
}

/** Anime status dto. */
export enum StatusDto {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotAired = 'NOT_YET_AIRED',
  Default = '',
}

/** Anime data. */
export interface AnimeDto {

  /** Anime ID. */
  readonly id: number;

  /** Date created. */
  readonly created: string;

  /** Date modified. */
  readonly modified: string;

  /** English title. */
  readonly title_eng: string;

  /** Japanese title. */
  readonly title_jpn: string;

  /** Thumbnail of anime. */
  readonly image: string | null;

  /** Aired date. */
  readonly aired: DateRangeDto;

  /** Anime type. */
  readonly type: TypeDto;

  /** Status of anime. */
  readonly status: StatusDto;
}
