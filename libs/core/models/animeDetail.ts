import { OmitImmerable } from '../models/immerable';

import { Anime } from './anime';
import { Genre } from './genre';
import { Studio } from './studio';

/** Base model for anime. */
export class AnimeDetail extends Anime {

  /** Youtube trailer. */
  public readonly trailerYoutubeId: string | null;

  /** Airing at the moment. */
  public readonly airing: boolean;

  /** Synopsis. */
  public readonly synopsis: string;

  /** List studio id. */
  public readonly studios: readonly number[];

  /** Studio data. */
  public readonly studiosData: readonly Studio[];

  /** List genres id. */
  public readonly genres: readonly number[];

  /** Genre list. */
  public readonly genresData: readonly Genre[];

  public constructor(data: AnimeInitArgs) {
    super(data);
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.airing = data.airing;
    this.synopsis = data.synopsis;
    this.studios = data.studios;
    this.studiosData = data.studiosData;
    this.genres = data.genres;
    this.genresData = data.genresData;
  }
}

type AnimeInitArgs = OmitImmerable<AnimeDetail>;

// import { StatusModel, TypeModel } from '../enum/anime';
// import { GenresTypeModel } from '../enum/genresType';
// import { Immerable, OmitImmerable } from '../models/immerable';

// import { Anime } from './anime';
// import { DateRange } from './dateRange';

// /** Base model for anime. */
// export class AnimeDetail extends Immerable implements Anime {
//   /** Id. */
//   public readonly id: number;

//   /** English title. */
//   public readonly titleEnglish: string;

//   /** Japan title. */
//   public readonly titleJapan: string;

//   /** Image. */
//   public readonly image: string | null;

//   /** Aired start. */
//   public readonly aired: DateRange;

//   /** Type. */
//   public readonly type: TypeModel;

//   /** Status. */
//   public readonly status: StatusModel;

//   /** Youtube trailer. */
//   public readonly trailerYoutubeId: string | null;

//   /** Airing at the moment. */
//   public readonly airing: boolean;

//   /** Synopsis. */
//   public readonly synopsis: string;

//   /** List studio id. */
//   public readonly studios: readonly number[];

//   /** Studio data. */
//   public readonly studiosData: readonly StatusModel[];

//   /** List genres id. */
//   public readonly genres: readonly number[];

//   /** Genre list. */
//   public readonly genresData: readonly GenresTypeModel[];

//   public constructor(data: AnimeInitArgs) {
//     super();
//     this.id = data.id;
//     this.titleEnglish = data.titleEnglish;
//     this.titleJapan = data.titleJapan;
//     this.image = data.image;
//     this.aired = data.aired;
//     this.type = data.type;
//     this.status = data.status;
//     this.trailerYoutubeId = data.trailerYoutubeId;
//     this.airing = data.airing;
//     this.synopsis = data.synopsis;
//     this.studios = data.studios;
//     this.studiosData = data.studiosData;
//     this.genres = data.genres;
//     this.genresData = data.genresData;
//   }
// }

// type AnimeInitArgs = OmitImmerable<AnimeDetail>;
