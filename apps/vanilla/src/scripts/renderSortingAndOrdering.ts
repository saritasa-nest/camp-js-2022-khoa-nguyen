import { OrderOption } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { Sorting } from '@js-camp/core/models/sorting';

import { DEFAULT_LIMIT, SORT_OPTIONS } from '../constants';
import { ORDER_KEY, SORTING_KEY } from '../constants/key';
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
    selectSort.value = getValueFromLocalStorage<Sorting>(SORTING_KEY)?.title ?? SORT_OPTIONS[0].title;
    selectSort.innerHTML = sortOptionHTML;
    selectSort.addEventListener('change', () => {
      const { value } = selectSort;
    setValueToLocalStorage(SORTING_KEY, SORT_OPTIONS.filter(item => item.title === value)[0]);
    const selectSortingValue = getValueFromLocalStorage<Sorting>(SORTING_KEY) ?? SORT_OPTIONS[0];

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
    selectOrdering.value = getValueFromLocalStorage<OrderOption>(ORDER_KEY) ?? OrderOption.Ascending;
    selectOrdering.innerHTML = orderOptionHTML;
    selectOrdering.addEventListener('change', () => {

    setValueToLocalStorage(ORDER_KEY, selectOrdering.value);
    const selectOrderingValue = getValueFromLocalStorage<OrderOption>(ORDER_KEY) ?? OrderOption.Ascending;

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
