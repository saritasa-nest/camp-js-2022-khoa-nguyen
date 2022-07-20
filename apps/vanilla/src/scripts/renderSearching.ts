
import { SearchParamsService } from '../services/searchParams';

import { getInitialQueryParams } from './initAnimeTable';

import { renderListOnActivePage } from './renderPagination';

/** Render search result to UI. */
export function renderSearchingAndHandle(): void {
  const input = document.querySelector<HTMLInputElement>('.search__form-input');
  const button = document.querySelector('.search__form-button');
  if (input == null || button == null) {
    return;
  }
  button.addEventListener('click', () => {
    const searchString = input.value;
    SearchParamsService.setSearchParamToUrl('search', searchString);
    SearchParamsService.removeParam('page');
    renderListOnActivePage(getInitialQueryParams());
  });
}
