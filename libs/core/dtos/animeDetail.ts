import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Anime detail DTO. */
export interface AnimeDetailDto extends AnimeDto {

  /** Youtube trailer. */
  readonly trailer_youtube_id: string | null;

  /** Airing at the moment. */
  readonly airing: boolean;

  /** Synopsis. */
  readonly synopsis: string;

  /** List studio id. */
  readonly studios: readonly number[];

  /** Studio data. */
  readonly studios_data: readonly StudioDto[];

  /** List genres id. */
  readonly genres: readonly number[];

  /** Genre list. */
  readonly genres_data: readonly GenreDto[];
}
