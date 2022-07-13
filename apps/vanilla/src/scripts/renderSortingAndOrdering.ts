import { OrderOption, SortValue } from '@js-camp/core/enum';

import { DEFAULT_LIMIT, SORT_OPTIONS } from '../constants';
import { PaginationOptions } from '../interface/paginationInterface';

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
    selectSort.addEventListener('change', () => {
        const { value } = selectSort;
        options.sorting.value = SORT_OPTIONS.filter(item => item.title === value)[0].value as SortValue;
        options.offset = DEFAULT_LIMIT;
        options.activePage = 1;
        renderListAndPaginationToUI(options);
      });
  }
  if (selectOrdering) {
    selectOrdering.innerHTML = orderOptionHTML;
    selectOrdering.addEventListener('change', () => {
      options.offset = DEFAULT_LIMIT;
      options.activePage = 1;
      options.isAscending = !options.isAscending;
      renderListAndPaginationToUI(options);
    });
  }
}
