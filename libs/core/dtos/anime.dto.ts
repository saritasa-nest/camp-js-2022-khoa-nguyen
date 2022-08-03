import { StatusDto, TypeDto } from '../enum/anime';

import { DateRangeDto } from './dateRange.dto';

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
  readonly image: string;

  /** Aired date. */
  readonly aired: DateRangeDto;

  /** Anime type. */
  readonly type: TypeDto;

  /** Status of anime. */
  readonly status: StatusDto;
}
