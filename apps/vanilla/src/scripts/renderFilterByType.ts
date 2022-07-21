
import { FILTER_TYPE_OPTIONS, KEY_ACTIVE_PAGE, KEY_TYPE } from '../constants';
import { SearchParamsService } from '../services/searchParams';
import { setDefaultSelected } from '../utils';

import { getInitialQueryParams } from './initAnimeTable';

import { renderListOnActivePage } from './renderPagination';

const selectType = document.querySelector<HTMLSelectElement>('.filter__select_type');

/** Render filter by type. */
export function renderFilterByType(): void {
  const typeOptionHTML = FILTER_TYPE_OPTIONS.map(item => `<option value="${item.title}">${item.title}</option>`).join('');
  const searchParams = SearchParamsService.getSearchParams();
  if (selectType == null) {
    return;
  }
  selectType.innerHTML = typeOptionHTML;

  setDefaultSelected(selectType, searchParams.type != null ? FILTER_TYPE_OPTIONS.filter(item =>
    item.value === searchParams.type)[0].title : FILTER_TYPE_OPTIONS[0].title) ;

  selectType.addEventListener('change', () => {
    SearchParamsService.setSearchParamToUrl(KEY_TYPE, FILTER_TYPE_OPTIONS.filter(item => selectType.value === item.title)[0].value);
    SearchParamsService.removeParam(KEY_ACTIVE_PAGE);
    renderListOnActivePage(getInitialQueryParams());
  });
}
