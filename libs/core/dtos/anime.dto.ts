import { StatusModel, TypeModel } from '../enum';

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
  readonly type: TypeModel;

  /** Status of anime. */
  readonly status: StatusModel;
}
