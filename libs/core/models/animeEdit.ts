import { AnimeDetail } from './animeDetail';
import { OmitImmerable } from './immerable';

/** Anime season. */
export enum Season {
  Summer = 'Summer',
  Winter = 'Winter',
  Spring = 'Spring',
  Fall = 'Fall',
  NonSeasonal = 'None seasonal',
}

/** Rating of anime. */
export enum Rating {
  GeneralAudiences = 'G',
  ParentalGuidance = 'PG',
  ParentsStrongly = 'PG-13',
  Restricted = 'R-17',
  RestrictedPlus = 'R-PLUS',
  RestrictedX = 'R-X',
  Unknown = 'Unknown',
}

/** Source of anime. */
export enum Source {
  FourKomaManga = 'Four koma manga',
  Book = 'Book',
  CardGame = 'Card game',
  Game = 'game',
  LightNovel = 'Light novel',
  Manga = 'Manga',
  MixedMedia = 'Mixed media',
  Music = 'Music',
  Novel = 'Novel',
  Original = 'Original',
  PictureBook = 'Picture book',
  Radio = 'Radio',
  VisualNovel = 'Visual novel',
  WebManga = 'Web manga',
  WebNovel = 'Web novel',
  Other = 'Other',
  Unknown = 'Unknown',
}

/** Anime editor. */
export class AnimeEdit extends AnimeDetail {

  /** Source. */
  public readonly source: Source;

  /** Rating. */
  public readonly rating: Rating;

  /** Season. */
  public readonly season: Season;

  public constructor(data: InitArgsAnimeEdit) {
    super(data);
    this.source = data.source;
    this.rating = data.rating;
    this.season = data.season;
  }
}

type InitArgsAnimeEdit = OmitImmerable<AnimeEdit>;
