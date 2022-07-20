import { TypeModel } from '@js-camp/core/enum';

import { FILTER_TYPE_OPTIONS } from '../constants';
import { KEY_TYPE } from '../constants/key';
import { LocalStorageService } from '../services/localStore';
import { setDefaultSelected } from '../utils';

import { INITIAL_PAGINATION } from './initAnimeTable';

import { renderListOnActivePage } from './renderPagination';

const selectType = document.querySelector<HTMLSelectElement>('.filter__item_select-type');

/**
 * Render filter by type.
 * @param options Pagination options.
 */
export function renderFilterByType(): void {
  const typeOptionHTML = FILTER_TYPE_OPTIONS.map(item => `<option value="${item.title}">${item.title}</option>`).join('');
  if (selectType == null) {
    return;
  }
  selectType.innerHTML = typeOptionHTML;
  setDefaultSelected(selectType, FILTER_TYPE_OPTIONS.filter(item =>
    item.value === LocalStorageService.getValue<TypeModel>(KEY_TYPE))[0]?.title ??
    FILTER_TYPE_OPTIONS[0].title);
  selectType.addEventListener('change', () => {
    LocalStorageService.setValue(KEY_TYPE, FILTER_TYPE_OPTIONS.filter(item => selectType.value === item.title)[0].value);
    renderListOnActivePage(INITIAL_PAGINATION);
  });
}
