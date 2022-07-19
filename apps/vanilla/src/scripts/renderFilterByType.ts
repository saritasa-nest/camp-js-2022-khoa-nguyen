import { TypeModel } from '@js-camp/core/enum';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_OFFSET, DEFAULT_SEARCH, FILTER_TYPE_OPTIONS } from '../constants';
import { KEY_SEARCHING, KEY_TYPE } from '../constants/key';
import { LocalStorageService } from '../services/localStore';
import { setDefaultSelected } from '../utils';

import { renderListOnActivePage } from './renderPagination';

const selectType = document.querySelector<HTMLSelectElement>('.filter__item_select-type');

/**
 * Render filter by type.
 * @param options Pagination options.
 */
export function renderFilterByType(options: AnimeListQueryOptions): void {
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
    const valueType = LocalStorageService.getValue<TypeModel>(KEY_TYPE) ?? TypeModel.Default;
    const optionsUpdated = new AnimeListQueryOptions({
      ...options,
      offset: DEFAULT_OFFSET,
      activePage: DEFAULT_ACTIVE_PAGE,
      type: valueType,
      search: LocalStorageService.getValue(KEY_SEARCHING) ?? DEFAULT_SEARCH,
    });
    renderListOnActivePage(optionsUpdated);
  });
}
