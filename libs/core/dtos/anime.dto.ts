import { StatusEnum, TypeEnum } from '../enum/enum';

/** Anime data interface.*/
export interface AnimeDto {

  /** Anime ID.*/
  readonly id: number;

  /** Date created.*/
  readonly created: number;

  /** Date modified.*/
  readonly modified: string;

  /** English title.*/
  readonly title_eng: string;

  /** Japanese title.*/
  readonly title_jpn: string;

  /** Thumbnail of anime.*/
  readonly image: string;

  /** Aired date.*/
  readonly aired: {

    /** Start date.*/
    readonly start: Date;

    /** End date. */
    readonly end: Date;
  };

  /** Anime type. */
  readonly type: TypeEnum;

  /** Status of anime. */
  readonly status: StatusEnum;
}
