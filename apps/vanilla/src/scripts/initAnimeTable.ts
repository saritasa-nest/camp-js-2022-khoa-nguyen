import { SortTitle, SortValue } from '@js-camp/core/enum';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants';
import { PaginationOptions } from '../interface/paginationInterface';
import { fetchAnimeList } from '../scripts/fetchAnimeList';

import { renderAnimeList } from './renderAnimeList';
import { renderListAndPaginationToUI } from './renderPagination';
import { renderSortingAndOrdering } from './renderSortingAndOrdering';

/**
 * Init anime table view.
 */
export async function initAnimeTable(): Promise<void> {
  const INITIAL_PAGINATION: PaginationOptions = {
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    activePage: DEFAULT_ACTIVE_PAGE,
    totalPages: 0,
    sorting: {
      title: SortTitle.TitleEnglish,
      value: SortValue.TitleEnglish,
    },
    isAscending: true,
  };
  const animeListInitial = await fetchAnimeList(INITIAL_PAGINATION);

  const PAGINATION_OPTIONS: PaginationOptions = {
    ...INITIAL_PAGINATION,
    totalPages: Math.ceil(animeListInitial.count / DEFAULT_LIMIT) - 1,
  };
  renderAnimeList(PAGINATION_OPTIONS);
  renderListAndPaginationToUI(PAGINATION_OPTIONS);
  renderSortingAndOrdering(PAGINATION_OPTIONS);
}
