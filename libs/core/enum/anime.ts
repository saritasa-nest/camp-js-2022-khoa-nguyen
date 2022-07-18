
/** Anime type dto. */
export enum TypeDto {
  ONA = 'ONA',
  TV = 'TV',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  MUSIC = 'MUSIC',
  OVA = 'OVA',
  DEFAULT = '',
}

/** Anime status dto. */
export enum StatusDto {
  AIRING = 'AIRING',
  FINISHED = 'FINISHED',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NOT_YET_AIRED = 'NOT_YET_AIRED',
  DEFAULT = '',
}

/** Anime type model. */
export enum TypeModel {
  Ona = 'Ona',
  Tv = 'Tv',
  Movie = 'Movie',
  Special = 'Special',
  Music = 'Music',
  Ova = 'Ova',
  Default = '',
}

/** Anime status model. */
export enum StatusModel {
  Airing = 'Airing',
  Finished = 'Finished',
  NotAired = 'Not yet aired',
  Default = '',
}
