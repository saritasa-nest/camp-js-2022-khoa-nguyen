import { Sorting } from '@js-camp/core/models/sorting';

import { SORT_OPTIONS } from '../constants';
import { KEY_ORDER, KEY_SORTING } from '../constants/key';
import { OrderOption } from '../enum';
import { LocalStorageService } from '../services/localStore';
import { setDefaultSelected } from '../utils';

import { getInitialQueryParams } from './initAnimeTable';

import { renderListOnActivePage } from './renderPagination';

const selectSort = document.querySelector<HTMLSelectElement>('.filter__item_select-sort');
const selectOrdering = document.querySelector<HTMLSelectElement>('.filter__item_select-order');

/**
 * Init and render sorting and ordering list, hence render corresponding list anime.
 */
export function renderSortingAndOrdering(): void {
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
  setDefaultSelected(selectSort, LocalStorageService.getValue<Sorting>(KEY_SORTING)?.title ?? SORT_OPTIONS[0].title);
  selectSort.addEventListener('change', () => {
    const { value } = selectSort;
    LocalStorageService.setValue(KEY_SORTING, SORT_OPTIONS.filter(item => item.title === value)[0]);
    renderListOnActivePage(getInitialQueryParams());
    });

  if (selectOrdering == null) {
    return;
  }
  selectOrdering.innerHTML = orderOptionHTML;
  setDefaultSelected(selectOrdering, LocalStorageService.getValue<OrderOption>(KEY_ORDER) ?? OrderOption.Ascending);
  selectOrdering.addEventListener('change', () => {
    LocalStorageService.setValue(KEY_ORDER, selectOrdering.value);
    renderListOnActivePage(getInitialQueryParams());
  });
}
