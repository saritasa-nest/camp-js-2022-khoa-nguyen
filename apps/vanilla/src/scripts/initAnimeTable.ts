import { OrderOption, TypeModel } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { Sorting } from '@js-camp/core/models/sorting';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_SEARCH, SORT_OPTIONS } from '../constants';
import { KEY_ORDER, KEY_SEARCHING, KEY_SORTING, KEY_TYPE } from '../constants/key';
import { LocalStorageService } from '../services/localStore';

import { renderFilterByType } from './renderFilterByType';
import { renderListOnActivePage } from './renderPagination';
import { renderSearchingAndHandle } from './renderSearching';
import { renderSortingAndOrdering } from './renderSortingAndOrdering';

/** Init anime table view. */
export function initAnimeTable(): void {
  LocalStorageService.clear();

  const INITIAL_PAGINATION: PaginationOptions = new PaginationOptions({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    activePage: DEFAULT_ACTIVE_PAGE,
    totalPages: 0,
    sorting: new Sorting({
      ...LocalStorageService.getValue<Sorting>(KEY_SORTING) ?? SORT_OPTIONS[0],
      isAscending: (LocalStorageService.getValue<OrderOption>(KEY_ORDER) === null ||
      LocalStorageService.getValue<OrderOption>(KEY_ORDER) === OrderOption.Ascending),
    }),
    type: LocalStorageService.getValue<TypeModel>(KEY_TYPE) ?? TypeModel.Default,
    search: LocalStorageService.getValue<TypeModel>(KEY_SEARCHING) ?? DEFAULT_SEARCH,
  });

  renderListOnActivePage(INITIAL_PAGINATION);
  renderSortingAndOrdering(INITIAL_PAGINATION);
  renderFilterByType(INITIAL_PAGINATION);
  renderSearchingAndHandle(INITIAL_PAGINATION);
}
