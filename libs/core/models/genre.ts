import { Immerable, OmitImmerable } from './immerable';

/** Genres type model. */
export enum GenresTypeModel {
  Genres = 'Genres',
  ExplicitGenres = 'Explicit genres',
  Themes = 'Themes',
  Demographics = 'Demographics',
}

/** Genre. */
export class Genre extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  /** Created date. */
  public readonly created: string;

  /** Modified date. */
  public readonly modified: string;

  /** Type of genres. */
  public readonly type: GenresTypeModel;

  public constructor(data: PostInitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.created = data.created;
    this.modified = data.modified;
    this.type = data.type;
  }
}

type PostInitArgs = OmitImmerable<Genre>;
