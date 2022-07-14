import { OrderOption } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { Sorting } from '@js-camp/core/models/sorting';

import { DEFAULT_LIMIT, SORT_OPTIONS } from '../constants';

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

    // const optionsUpdated = new PaginationOptions({
    //   ...options,
    //   offset: DEFAULT_LIMIT,
    //   activePage: 1,
    //   sorting: new Sorting({
    //     ...SORT_OPTIONS.filter(item => item.title === value)[0],
    //   isAscending: options.sorting.isAscending,
    //   }),
    // });
    //   renderListAndPaginationToUI(optionsUpdated);

    options.sorting = SORT_OPTIONS.filter(item => item.title === value)[0] as Sorting;
    options.offset = DEFAULT_LIMIT;
    options.activePage = 1;
    renderListAndPaginationToUI(options);
    });
  }
  if (selectOrdering) {
    selectOrdering.innerHTML = orderOptionHTML;
    selectOrdering.addEventListener('change', () => {
        // const optionsUpdated = new PaginationOptions({
        //   ...options,
        // offset: DEFAULT_LIMIT,
        // activePage: 1,
        // sorting: new Sorting({
        //   ...options.sorting,
        // isAscending: !options.sorting.isAscending,
        // }),
        // });
        // renderListAndPaginationToUI(optionsUpdated);

        options.offset = DEFAULT_LIMIT;
        options.activePage = 1;
        options.sorting.isAscending = !options.sorting.isAscending;
        renderListAndPaginationToUI(options);
    });
  }
}
