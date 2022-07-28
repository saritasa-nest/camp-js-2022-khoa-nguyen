import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Sorting, SortTitle, SortValue } from '@js-camp/core/models/sorting';

import { TypeDto } from '@js-camp/core/dtos/anime.dto';

import { environment } from '../environments/environment';

export const BASE_URL = environment.apiUrl;
export const API_KEY = environment.apiKey;

export const DEFAULT_LIMIT = 25;
export const DEFAULT_OFFSET = 0;
export const DEFAULT_ACTIVE_PAGE = 1;
export const DEFAULT_SEARCH = '';
export const DEFAULT_TOTAL_PAGE = 0;
export const FIRST_PAGE = 1;
export const PAGE_RANGE = 5;
export const PAGE_STEP = 2;

export const ANIME_LIST_API = 'anime/anime/';

/** Options of type interface. */
interface FilterType {

  /** Title of options. */
  readonly title: string;

  /** Value of options. */
  readonly value: TypeDto;
}

export const FILTER_TYPE_OPTIONS: readonly FilterType[] = [
  {
    title: 'Movie',
    value: TypeDto.Movie,
  },
  {
    title: 'Music',
    value: TypeDto.Music,
  },
  {
    title: 'Ona',
    value: TypeDto.Ona,
  },
  {
    title: 'Ova',
    value: TypeDto.Ova,
  },
  {
    title: 'Special',
    value: TypeDto.Special,
  },
  {
    title: 'TV',
    value: TypeDto.Tv,
  },
];

/** Options of type interface. */
interface SortingOptions {

  /** Title of options. */
  readonly title: SortTitle;

  /** Value of options. */
  readonly value: SortValue;
}

export const SORT_OPTIONS: readonly SortingOptions[] = [
  {
    title: SortTitle.TitleEnglish,
    value: SortValue.TitleEnglish,
  },
  {
    title: SortTitle.AiredStartDate,
    value: SortValue.AiredStartDate,
  },
  {
    title: SortTitle.Status,
    value: SortValue.Status,
  },
];

/** Options of ordering.. */
export enum OrderOption {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

/** Options of ordering. */
interface OrderOptions {

  /** Title of options. */
  readonly title: string;

  /** Value of options. */
  readonly value: OrderOption;
}

export const ORDERING_OPTIONS: readonly OrderOptions[] = [
  {
    title: OrderOption.Ascending,
    value: OrderOption.Ascending,
  },
  {
    title: OrderOption.Descending,
    value: OrderOption.Descending,
  },
];

export const key = {
  order: 'ordering',
  sorting: 'sortBy',
  type: 'type',
  token: 'token',
  searching: 'search',
  anime: 'anime',
  activePage: 'page',
};

export const DEFAULT_ANIME_LIST_QUERY: AnimeListQueryOptions = new AnimeListQueryOptions({
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
  activePage: DEFAULT_ACTIVE_PAGE,
  totalPages: DEFAULT_TOTAL_PAGE,
  sorting: new Sorting({
    title: SortTitle.TitleEnglish,
    value: SortValue.TitleEnglish,
    isAscending: true,
  }),
});
