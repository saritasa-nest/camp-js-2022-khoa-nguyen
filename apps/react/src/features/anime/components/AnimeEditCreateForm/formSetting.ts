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
  readonly endDate: Date | null;

  /** Start date. */
  readonly startDate: Date | null;

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
    startDate: yup
      .date()
      .required(REQUIRED_MESSAGE)
      .nullable()
      .typeError('Please input correct date format.'),
    endDate: yup
      .date()
      .required(REQUIRED_MESSAGE)
      .nullable()
      .typeError('Please input correct date format.'),
    rating: yup.string().required(REQUIRED_MESSAGE),
    season: yup.string().required(REQUIRED_MESSAGE),
    synopsis: yup.string().required(REQUIRED_MESSAGE),
    studios: yup.array().default([])
      .min(1, REQUIRED_MESSAGE),
    genres: yup.array().default([])
      .min(1, REQUIRED_MESSAGE),
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

type OmittedAnimeValidationType = Omit<AnimeValidationSchema, 'genres' | 'studios'>;
export type AnimeForm = PartialNull<OmittedAnimeValidationType> & AnimeRestType;
export const INITIAL_CREATE_VALUE: AnimeForm = {
  image: '',
  trailerYoutubeId: '',
  titleEnglish: '',
  titleJapan: '',
  type: '',
  status: '',
  source: '',
  isAiring: false,
  startDate: null,
  endDate: null,
  rating: '',
  season: '',
  synopsis: '',
  studios: [],
  genres: [],
};
