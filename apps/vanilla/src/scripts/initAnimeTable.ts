import { OrderOption, Type } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { Sorting } from '@js-camp/core/models/sorting';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, SORT_OPTIONS } from '../constants';
import { KEY_ORDER, KEY_SORTING, KEY_TYPE } from '../constants/key';
import { fetchAnimeList } from '../scripts/fetchAnimeList';
import { getValueFromLocalStorage } from '../service/localStorage';

import { renderAnimeList } from './renderAnimeList';
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
      ...getValueFromLocalStorage<Sorting>(KEY_SORTING) ?? SORT_OPTIONS[0],
      isAscending: (!getValueFromLocalStorage<OrderOption>(KEY_ORDER) ||
        getValueFromLocalStorage<OrderOption>(KEY_ORDER) === OrderOption.Ascending),
    }),
    type: getValueFromLocalStorage<Type>(KEY_TYPE) ?? Type.DEFAULT,
  });
  const animeListInitial = await fetchAnimeList(INITIAL_PAGINATION);

  const PAGINATION_OPTIONS: PaginationOptions = new PaginationOptions({
    ...INITIAL_PAGINATION,
    totalPages: Math.ceil(animeListInitial.count / DEFAULT_LIMIT) - 1,
  });
  renderAnimeList(PAGINATION_OPTIONS);
  renderListAndPaginationToUI(PAGINATION_OPTIONS);
  renderSortingAndOrdering(PAGINATION_OPTIONS);
  renderFilterByType(PAGINATION_OPTIONS);
}
