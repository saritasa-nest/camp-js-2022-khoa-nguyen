import { Type } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { setDefaultSelected } from '@js-camp/core/utils';

import { FILTER_TYPE_OPTIONS } from '../constants';
import { KEY_TYPE } from '../constants/key';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../service/localStorage';

import { renderListAndPaginationToUI } from './renderPagination';

const selectType = document.querySelector<HTMLSelectElement>('.filter__item_select-type');

/** Render filter by type.
 * @param options Pagination options.
 */
export function renderFilterByType(options: PaginationOptions): void {
  const typeOptionHTML = FILTER_TYPE_OPTIONS.map(item => `<option value="${item.title}">${item.title}</option>`).join('');
  if (selectType) {
    selectType.innerHTML = typeOptionHTML;
    setDefaultSelected(selectType, FILTER_TYPE_OPTIONS.filter(item => item.value === getValueFromLocalStorage<Type>(KEY_TYPE))[0].title);
    selectType.addEventListener('change', () => {
      setValueToLocalStorage(KEY_TYPE, FILTER_TYPE_OPTIONS.filter(item => selectType.value === item.title)[0].value);
      const valueType = getValueFromLocalStorage<Type>(KEY_TYPE) ?? Type.DEFAULT;
      const optionsUpdated = new PaginationOptions({
        ...options,
        activePage: 1,
        type: valueType,
      });
      renderListAndPaginationToUI(optionsUpdated);
    });
  }
}
