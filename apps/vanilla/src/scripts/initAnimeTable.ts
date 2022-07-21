import { OrderOption } from '@js-camp/core/enum';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Sorting } from '@js-camp/core/models/sorting';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_SEARCH, KEY_ORDER, KEY_SORTING, SORT_OPTIONS } from '../constants';
import { fetchAnimeList } from '../scripts/fetchAnimeList';
import { LocalStorageService } from '../service/localStorage';

import { renderAnimeList } from './renderAnimeList';
import { renderListAndPaginationToUI } from './renderPagination';
import { searchingHandler } from './renderSearching';
import { renderSortingAndOrdering } from './renderSortingAndOrdering';

/** Init anime table view. */
export async function initAnimeTable(): Promise<void> {
  const INITIAL_PAGINATION = new AnimeListQueryOptions({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    activePage: DEFAULT_ACTIVE_PAGE,
    totalPages: 0,
    sorting: new Sorting({
      ...LocalStorageService.getValue<Sorting>(KEY_SORTING) ?? SORT_OPTIONS[0],
      isAscending: (LocalStorageService.getValue<OrderOption>(KEY_ORDER) === null ||
      LocalStorageService.getValue<OrderOption>(KEY_ORDER) === OrderOption.Ascending),
    }),
    search: DEFAULT_SEARCH,
  });
  const animeListInitial = await fetchAnimeList(INITIAL_PAGINATION);

  const PAGINATION_OPTIONS: AnimeListQueryOptions = new AnimeListQueryOptions({
    ...INITIAL_PAGINATION,
    totalPages: Math.ceil(animeListInitial.count / DEFAULT_LIMIT),
  });
  renderAnimeList(PAGINATION_OPTIONS);
  renderListAndPaginationToUI(PAGINATION_OPTIONS);
  renderSortingAndOrdering(PAGINATION_OPTIONS);
  searchingHandler(PAGINATION_OPTIONS);
}
