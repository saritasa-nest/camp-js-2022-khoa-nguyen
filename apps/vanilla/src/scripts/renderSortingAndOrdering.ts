
import { KEY_ORDER, KEY_SORTING, SORT_OPTIONS } from '../constants';
import { OrderOption } from '../enum';
import { SearchParamsService } from '../services/searchParams';
import { setDefaultSelected } from '../utils';

import { getInitialQueryParams } from './initAnimeTable';

import { renderListOnActivePage } from './renderPagination';

const selectSort = document.querySelector<HTMLSelectElement>('.filter__select_sort');
const selectOrdering = document.querySelector<HTMLSelectElement>('.filter__select_order');

/** Init and render sorting and ordering list, hence render corresponding list anime. */
export function renderSortingAndOrdering(): void {
  const searchParam = SearchParamsService.getSearchParams();
  const sortOptionHTML = SORT_OPTIONS.map(item => (
    `<option value="${item.title}">${item.title}</option>`
  ))
    .join('');

  const orderOptionHTML = Object.keys(OrderOption).map(item => (
    `<option value ="${item}">${item}</option>`
  ))
    .join('');
  if (selectSort == null) {
    return;
  }
  selectSort.innerHTML = sortOptionHTML;
  setDefaultSelected(selectSort, searchParam.sortBy != null ?
    SORT_OPTIONS.filter(item => item.value === searchParam.sortBy)[0].title :
    SORT_OPTIONS[0].title);
  selectSort.addEventListener('change', () => {
    const { value } = selectSort;
    SearchParamsService.setSearchParamToUrl(KEY_SORTING, SORT_OPTIONS.filter(item => item.title === value)[0].value);
    renderListOnActivePage(getInitialQueryParams());
    });

  if (selectOrdering == null) {
    return;
  }
  selectOrdering.innerHTML = orderOptionHTML;
  setDefaultSelected(selectOrdering, searchParam.ordering ?? OrderOption.Ascending);
  selectOrdering.addEventListener('change', () => {
    SearchParamsService.setSearchParamToUrl(KEY_ORDER,
      selectOrdering.value === OrderOption.Ascending ? OrderOption.Ascending : OrderOption.Descending);
    renderListOnActivePage(getInitialQueryParams());
  });
}
