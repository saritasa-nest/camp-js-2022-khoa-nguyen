
import { KEY_ACTIVE_PAGE, KEY_SEARCHING } from '../constants';
import { SearchParamsService } from '../services/searchParams';

import { getInitialQueryParams } from './initAnimeTable';

import { renderListOnActivePage } from './renderPagination';

/** Render search result to UI. */
export function renderSearchingAndHandle(): void {
  const input = document.querySelector<HTMLInputElement>('.search__input');
  const button = document.querySelector('.search__button');
  if (input == null || button == null) {
    return;
  }
  button.addEventListener('click', () => {
    const searchString = input.value;
    SearchParamsService.setSearchParamToUrl(KEY_SEARCHING, searchString);
    SearchParamsService.removeParam(KEY_ACTIVE_PAGE);
    renderListOnActivePage(getInitialQueryParams());
  });
}
