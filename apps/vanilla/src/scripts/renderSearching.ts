import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, KEY_SEARCHING } from '../constants';
import { LocalStorageService } from '../services/localStore';

import { renderListOnActivePage } from './renderPagination';

/**
 * Render search result to UI.
 * @param options Pagination option.
 */
export function renderSearchingAndHandle(options: AnimeListQueryOptions): void {
  const input = document.querySelector<HTMLInputElement>('.search__form-input');
  const button = document.querySelector('.search__form-button');
  if (input == null || button == null) {
    return;
  }
  button.addEventListener('click', () => {
    const searchString = input.value;
    LocalStorageService.setValue(KEY_SEARCHING, searchString);
    const optionsUpdated = new AnimeListQueryOptions({
      ...options,
      offset: DEFAULT_LIMIT,
      activePage: DEFAULT_ACTIVE_PAGE,
      search: searchString,
    });
    renderListOnActivePage(optionsUpdated);
  });
}
