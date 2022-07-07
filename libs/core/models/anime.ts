import { StatusEnum, TypeEnum } from '../enum/enum';
import { Immerable, OmitImmerable } from '../models/immerable';

/** Base model for anime. */
export class Anime extends Immerable {

  /** Id. */
  public readonly id: number;

  /** English title. */
  public readonly titleEng: string;

  /** Japan title. */
  public readonly titleJapan: string;

  /** Image. */
  public readonly image: string;

  /** Aired start. */
  public readonly airedStart: Date | null;

  /** Type. */
  public readonly type: TypeEnum;

  /** Status. */
  public readonly status: StatusEnum;

  public constructor(data: AnimeInitArgs) {
    super();
    this.id = data.id;
    this.titleEng = data.titleEng;
    this.titleJapan = data.titleJapan;
    this.image = data.image;
    this.airedStart = data.airedStart;
    this.type = data.type;
    this.status = data.status;
  }
}

type AnimeInitArgs = OmitImmerable<Anime>;
