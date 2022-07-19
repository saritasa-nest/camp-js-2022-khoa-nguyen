import { OrderOption, TypeModel } from '@js-camp/core/enum';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Sorting } from '@js-camp/core/models/sorting';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_SEARCH, DEFAULT_TOTAL_PAGE, SORT_OPTIONS } from '../constants';
import { KEY_ORDER, KEY_SEARCHING, KEY_SORTING, KEY_TYPE } from '../constants/key';
import { LocalStorageService } from '../services/localStore';

import { renderFilterByType } from './renderFilterByType';
import { renderListOnActivePage } from './renderPagination';
import { renderSearchingAndHandle } from './renderSearching';
import { renderSortingAndOrdering } from './renderSortingAndOrdering';
import { renderHeader } from './renderHeader';

/** Init anime table view. */
export function initAnimeTable(): void {
  LocalStorageService.clear();

  const INITIAL_PAGINATION: AnimeListQueryOptions = new AnimeListQueryOptions({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    activePage: DEFAULT_ACTIVE_PAGE,
    totalPages: DEFAULT_TOTAL_PAGE,
    sorting: new Sorting({
      ...LocalStorageService.getValue<Sorting>(KEY_SORTING) ?? SORT_OPTIONS[0],
      isAscending: (LocalStorageService.getValue<OrderOption>(KEY_ORDER) === null ||
      LocalStorageService.getValue<OrderOption>(KEY_ORDER) === OrderOption.Ascending),
    }),
    type: LocalStorageService.getValue<TypeModel>(KEY_TYPE) ?? TypeModel.Default,
    search: LocalStorageService.getValue<TypeModel>(KEY_SEARCHING) ?? DEFAULT_SEARCH,
  });
  renderHeader();
  renderListOnActivePage(INITIAL_PAGINATION);
  renderSortingAndOrdering(INITIAL_PAGINATION);
  renderFilterByType(INITIAL_PAGINATION);
  renderSearchingAndHandle(INITIAL_PAGINATION);
}
