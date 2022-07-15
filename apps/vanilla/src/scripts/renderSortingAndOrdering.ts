import { OrderOption } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { Sorting } from '@js-camp/core/models/sorting';
import { setDefaultSelected } from '@js-camp/core/utils';

import { DEFAULT_LIMIT, SORT_OPTIONS } from '../constants';
import { KEY_ORDER, KEY_SORTING } from '../constants/key';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../service/localStorage';

import { renderListAndPaginationToUI } from './renderPagination';

const selectSort = document.querySelector<HTMLSelectElement>('.filter__item_select-sort');
const selectOrdering = document.querySelector<HTMLSelectElement>('.filter__item_select-order');

/** Init and render sorting and ordering list, hence render corresponding list anime.
 * @param options Options of pagination.
 */
export function renderSortingAndOrdering(options: PaginationOptions): void {
  const sortOptionHTML = SORT_OPTIONS.map(item => (
    `<option value="${item.title}">${item.title}</option>`
  )).join('');

  const orderOptionHTML = Object.keys(OrderOption).map(item => (
    `<option value ="${item}">${item}</option>`
  ))
    .join('');
  if (selectSort) {
    selectSort.innerHTML = sortOptionHTML;
    setDefaultSelected(selectSort, getValueFromLocalStorage<Sorting>(KEY_SORTING)?.title ?? SORT_OPTIONS[0].title);
    selectSort.addEventListener('change', () => {
      const { value } = selectSort;
    setValueToLocalStorage(KEY_SORTING, SORT_OPTIONS.filter(item => item.title === value)[0]);
    const selectSortingValue = getValueFromLocalStorage<Sorting>(KEY_SORTING) ?? SORT_OPTIONS[0];

    const optionsUpdated = new PaginationOptions({
      ...options,
      offset: DEFAULT_LIMIT,
      activePage: 1,
      sorting: new Sorting({
        ...options.sorting,
        ...selectSortingValue,
      }),
    });
      renderListAndPaginationToUI(optionsUpdated);

    });
  }
  if (selectOrdering) {
    selectOrdering.innerHTML = orderOptionHTML;
    setDefaultSelected(selectOrdering, getValueFromLocalStorage<OrderOption>(KEY_ORDER) ?? OrderOption.Ascending);
    selectOrdering.addEventListener('change', () => {

    setValueToLocalStorage(KEY_ORDER, selectOrdering.value);
    const selectOrderingValue = getValueFromLocalStorage<OrderOption>(KEY_ORDER) ?? OrderOption.Ascending;

    /** Get type of ordering option.*/
    function getSelectOptions(): boolean {
      if (selectOrderingValue === OrderOption.Ascending) {
        return true;
      }
        return false;
    }

    const optionsUpdated = new PaginationOptions({
      ...options,
      offset: DEFAULT_LIMIT,
      activePage: 1,
      sorting: new Sorting({
        ...options.sorting,
        isAscending: getSelectOptions(),
      }),
    });
    renderListAndPaginationToUI(optionsUpdated);
    });
  }
}
