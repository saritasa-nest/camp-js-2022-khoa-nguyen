import { Type } from '@js-camp/core/enum';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';

import { setDefaultSelected } from '../utils';

import { DEFAULT_ACTIVE_PAGE, FILTER_TYPE_OPTIONS } from '../constants';
import { KEY_TYPE } from '../constants/key';
import { LocalStorageService } from '../service/localStorage';

import { renderListAnimeWithActivePage } from './renderPagination';

const selectType = document.querySelector<HTMLSelectElement>('.filter__item_select-type');

/**
 * Render filter by type.
 * @param options Pagination options.
 */
export function renderFilterByType(options: PaginationOptions): void {
  const typeOptionHTML = FILTER_TYPE_OPTIONS.map(item => `<option value="${item.title}">${item.title}</option>`).join('');
  if (selectType == null) {
    return;
  }
  selectType.innerHTML = typeOptionHTML;

  setDefaultSelected(selectType, FILTER_TYPE_OPTIONS.filter(item =>
    item.value === LocalStorageService.getValue<Type>(KEY_TYPE))[0]?.title ??
    FILTER_TYPE_OPTIONS[0].title);

  selectType.addEventListener('change', () => {
    LocalStorageService.setValue(KEY_TYPE, FILTER_TYPE_OPTIONS.filter(item => selectType.value === item.title)[0].value);
    const valueType = LocalStorageService.getValue<Type>(KEY_TYPE) ?? Type.Default;
    const optionsUpdated = new PaginationOptions({
      ...options,
      activePage: DEFAULT_ACTIVE_PAGE,
      type: valueType,
    });
    renderListAnimeWithActivePage(optionsUpdated);
  });
}
