import { Type } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';

import { FILTER_TYPE_OPTIONS } from '../constants';

import { renderListAndPaginationToUI } from './renderPagination';

const selectType = document.querySelector<HTMLSelectElement>('.filter__item_select-type');

/** Render filter by type.
 * @param options Pagination options.
 */
export function renderFilterByType(options: PaginationOptions): void {
  const typeOptionHTML = FILTER_TYPE_OPTIONS.map(item => `<option value="${item.title}">${item.title}</option>`).join('');
  if (selectType) {
    selectType.innerHTML = typeOptionHTML;
    selectType.addEventListener('change', () => {
      const optionsUpdated = new PaginationOptions({
        ...options,
        activePage: 1,
        type: FILTER_TYPE_OPTIONS.filter(item => item.title === selectType.value)[0].value as Type,
      });
      renderListAndPaginationToUI(optionsUpdated);
    });
  }
}
