import { Genre, Studio } from '@js-camp/core/models';
import * as yup from 'yup';

const REQUIRED_MESSAGE = 'This field is required.';

type PartialNull<T> = {
  [P in keyof T]: T[P] | '' | null;
};

interface AnimeValidationSchema {

  /** Type. */
  readonly type: string;

  /** Status. */
  readonly status: string;

  /** Source. */
  readonly source: string;

  /** Whether anime is airing or not. */
  readonly isAiring: boolean;

  /** End date. */
  readonly endDate: string | null;

  /** Start date. */
  readonly startDate: string | null;

  /** Rating. */
  readonly rating: string;

  /** Season. */
  readonly season: string;

  /** Synopsis. */
  readonly synopsis: string;

  /** Studios. */
  readonly studios: string[];

  /** Genres. */
  readonly genres: string[];
}

export const validationSchema: yup.SchemaOf<AnimeValidationSchema> = yup
  .object()
  .shape({
    type: yup.string().required(REQUIRED_MESSAGE),
    status: yup.string().required(REQUIRED_MESSAGE),
    source: yup.string().required(REQUIRED_MESSAGE),
    isAiring: yup.boolean().required(REQUIRED_MESSAGE),
    startDate: yup.string().required(REQUIRED_MESSAGE),
    endDate: yup.string().required(REQUIRED_MESSAGE),
    rating: yup.string().required(REQUIRED_MESSAGE),
    season: yup.string().required(REQUIRED_MESSAGE),
    synopsis: yup.string().required(REQUIRED_MESSAGE),
    studios: yup.array().required(REQUIRED_MESSAGE)
      .default([]),
    genres: yup.array().required(REQUIRED_MESSAGE)
      .default([]),
  });

interface AnimeRestType {

  /** Image url. */
  readonly image: string | null;

  /** Trailer id. */
  readonly trailerYoutubeId: string | null;

  /** English title. */
  readonly titleEnglish: string;

  /** Japan title. */
  readonly titleJapan: string;

  /** Genres. */
  readonly genres: readonly Genre[];

  /** Studios. */
  readonly studios: readonly Studio[];
}

export type AnimeForm = PartialNull<Omit<AnimeValidationSchema, 'genres' | 'studios'> & AnimeRestType> ;

export const INITIAL_CREATE_VALUE: AnimeForm = {
  image: '',
  trailerYoutubeId: '',
  titleEnglish: '',
  titleJapan: '',
  type: '',
  status: '',
  source: '',
  isAiring: false,
  startDate: '',
  endDate: '',
  rating: '',
  season: '',
  synopsis: '',
  studios: [],
  genres: [],
};
