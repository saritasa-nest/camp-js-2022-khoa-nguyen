import { OrderOption } from '@js-camp/core/enum';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Sorting } from '@js-camp/core/models/sorting';

import { DEFAULT_LIMIT, DEFAULT_SEARCH, SORT_OPTIONS } from '../constants';
import { KEY_ORDER, KEY_SEARCHING, KEY_SORTING } from '../constants/key';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../service/localStorage';
import { setDefaultSelected } from '../utils';

import { renderListAndPaginationToUI } from './renderPagination';

const selectSort = document.querySelector<HTMLSelectElement>('.filter__item_select-sort');
const selectOrdering = document.querySelector<HTMLSelectElement>('.filter__item_select-order');

/** Init and render sorting and ordering list, hence render corresponding list anime.
 * @param options Options of pagination.
 */
export function renderSortingAndOrdering(options: AnimeListQueryOptions): void {
  const sortOptionHTML = SORT_OPTIONS.map(item => (
    `<option value="${item.title}">${item.title}</option>`
  )).join('');

  const orderOptionHTML = Object.keys(OrderOption).map(item => (
    `<option value ="${item}">${item}</option>`
  ))
    .join('');
  if (selectSort === null || selectSort === undefined) {
    return;
  }
  selectSort.innerHTML = sortOptionHTML;
  setDefaultSelected(selectSort, LocalStorageService.getValue<Sorting>(KEY_SORTING)?.title ?? SORT_OPTIONS[0].title);
  selectSort.addEventListener('change', () => {
      const { value } = selectSort;
      LocalStorageService.setValue(KEY_SORTING, SORT_OPTIONS.filter(item => item.title === value)[0]);
    const selectSortingValue = LocalStorageService.getValue<Sorting>(KEY_SORTING) ?? SORT_OPTIONS[0];

    const optionsUpdated = new AnimeListQueryOptions({
      ...options,
      offset: DEFAULT_LIMIT,
      activePage: 1,
      sorting: new Sorting({
        ...options.sorting,
        ...selectSortingValue,
      }),
      search: getValueFromLocalStorage(KEY_SEARCHING) ?? DEFAULT_SEARCH,
    });
      renderListAndPaginationToUI(optionsUpdated);

    });

  if (selectOrdering === null || selectOrdering === undefined) {
    return;
  }
  selectOrdering.innerHTML = orderOptionHTML;
  setDefaultSelected(selectOrdering, LocalStorageService.getValue<OrderOption>(KEY_ORDER) ?? OrderOption.Ascending);
  selectOrdering.addEventListener('change', () => {

    LocalStorageService.setValue(KEY_ORDER, selectOrdering.value);
    const selectOrderingValue = LocalStorageService.getValue<OrderOption>(KEY_ORDER) ?? OrderOption.Ascending;

    /** Get type of ordering option.*/
    function getSelectOptions(): boolean {
      if (selectOrderingValue === OrderOption.Ascending) {
        return true;
      }
      return false;
    }

    const optionsUpdated = new AnimeListQueryOptions({
      ...options,
      offset: DEFAULT_LIMIT,
      activePage: 1,
      sorting: new Sorting({
        ...options.sorting,
        isAscending: getSelectOptions(),
      }),
      search: getValueFromLocalStorage(KEY_SEARCHING) ?? DEFAULT_SEARCH,
    });
    renderListAndPaginationToUI(optionsUpdated);
    });
}
