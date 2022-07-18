import { OrderOption } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { Sorting } from '@js-camp/core/models/sorting';
import { setDefaultSelected } from '@js-camp/core/utils';

import { DEFAULT_LIMIT, SORT_OPTIONS } from '../constants';
import { KEY_ORDER, KEY_SORTING } from '../constants/key';
import { LocalStorageService } from '../service/localStorage';

import { renderListAnimeWithActivePage } from './renderPagination';

const selectSort = document.querySelector<HTMLSelectElement>('.filter__item_select-sort');
const selectOrdering = document.querySelector<HTMLSelectElement>('.filter__item_select-order');

/** Init and render sorting and ordering list, hence render corresponding list anime.
 * @param options Options of pagination.
 */
export function renderSortingAndOrdering(options: PaginationOptions): void {
  if (selectSort === null || selectSort === undefined) {
    return;
  }
  const sortOptionHTML = SORT_OPTIONS.map(item => (
    `<option value="${item.title}">${item.title}</option>`
  )).join('');

  const orderOptionHTML = Object.keys(OrderOption).map(item => (
    `<option value ="${item}">${item}</option>`
  ))
    .join('');
  selectSort.innerHTML = sortOptionHTML;
  setDefaultSelected(selectSort, LocalStorageService.getValue<Sorting>(KEY_SORTING)?.title ?? SORT_OPTIONS[0].title);
  selectSort.addEventListener('change', () => {
    const { value } = selectSort;
    LocalStorageService.setValue(KEY_SORTING, SORT_OPTIONS.filter(item => item.title === value)[0]);
    const selectSortingValue = LocalStorageService.getValue<Sorting>(KEY_SORTING) ?? SORT_OPTIONS[0];
    const optionsUpdated = new PaginationOptions({
      ...options,
      offset: DEFAULT_LIMIT,
      activePage: 1,
      sorting: new Sorting({
        ...options.sorting,
        ...selectSortingValue,
      }),
    });
      renderListAnimeWithActivePage(optionsUpdated);
    });

  if (selectOrdering === null || selectOrdering === undefined) {
    return;
  }
  selectOrdering.innerHTML = orderOptionHTML;
  setDefaultSelected(selectOrdering, LocalStorageService.getValue<OrderOption>(KEY_ORDER) ?? OrderOption.Ascending);
  selectOrdering.addEventListener('change', () => {

    LocalStorageService.setValue(KEY_ORDER, selectOrdering.value);
    const selectOrderingValue = LocalStorageService.getValue<OrderOption>(KEY_ORDER) ?? OrderOption.Ascending;

    const optionsUpdated = new PaginationOptions({
      ...options,
      offset: DEFAULT_LIMIT,
      activePage: 1,
      sorting: new Sorting({
        ...options.sorting,
        isAscending: selectOrderingValue === OrderOption.Ascending,
      }),
    });
    renderListAnimeWithActivePage(optionsUpdated);
    });
}
