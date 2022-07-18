import { OrderOption, TypeModel } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { Sorting } from '@js-camp/core/models/sorting';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, SORT_OPTIONS } from '../constants';
import { KEY_ORDER, KEY_SORTING, KEY_TYPE } from '../constants/key';
import { fetchAnimeList } from '../scripts/fetchAnimeList';
import { LocalStorageService } from '../services/localStore';

import { renderFilterByType } from './renderFilterByType';
import { renderListAndPaginationToUI } from './renderPagination';
import { renderSortingAndOrdering } from './renderSortingAndOrdering';

/** Init anime table view. */
export async function initAnimeTable(): Promise<void> {
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
  });
  const animeListInitial = await fetchAnimeList(INITIAL_PAGINATION);

  const PAGINATION_OPTIONS: PaginationOptions = new PaginationOptions({
    ...INITIAL_PAGINATION,
    totalPages: Math.ceil(animeListInitial.count / DEFAULT_LIMIT) - 1,
  });
  renderListAndPaginationToUI(PAGINATION_OPTIONS);
  renderSortingAndOrdering(PAGINATION_OPTIONS);
  renderFilterByType(PAGINATION_OPTIONS);
}
