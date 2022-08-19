import { AnimeDetailDto } from './animeDetail.dto';

/** Rating DTO. */
export enum RatingDto {
  GeneralAudiences = 'G',
  ParentalGuidance = 'PG',
  ParentsStrongly = 'PG_13',
  Restricted = 'R_17',
  RestrictedPlus = 'R_PLUS',
  RestrictedX = 'R_X',
  Unknown = 'UNKNOWN',
}

/** Season DTO. */
export enum SeasonDto {
  Summer = 'SUMMER',
  Winter = 'WINTER',
  Spring = 'SPRING',
  Fall = 'FALL',
  NonSeasonal = 'NON_SEASONAL',
}

/** Source DTO. */
export enum SourceDto {
  FourKomaManga = 'FOUR_KOMA_MANGA',
  Book = 'BOOK',
  CardGame = 'CARD_GAME',
  Game = 'GAME',
  LightNovel = 'LIGHT_NOVEL',
  Manga = 'MANGA',
  MixedMedia = 'MIXED_MEDIA',
  Music = 'MUSIC',
  Novel = 'NOVEL',
  Original = 'ORIGINAL',
  PictureBook = 'PICTURE_BOOK',
  Radio = 'RADIO',
  VisualNovel = 'VISUAL_NOVEL',
  WebManga = 'WEB_MANGA',
  WebNovel = 'WEB_NOVEL',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export type AnimeEditPutDto = Omit<AnimeEditDto, 'id' | 'studios_data' | 'genres_data'>;

/** Anime detail DTO. */
export interface AnimeEditDto extends AnimeDetailDto {

  /** Source. */
  readonly source: SourceDto;

  /** Rating. */
  readonly rating: RatingDto;

  /** Season. */
  readonly season: SeasonDto;

}
