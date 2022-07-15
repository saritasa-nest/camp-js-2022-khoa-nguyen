import { PaginationOptions } from '@js-camp/core/models/paginationOptions';

import { DEFAULT_LIMIT } from '../constants';

import { renderAnimeList } from './renderAnimeList';

/**
 * Render search result to UI.
 * @param options Pagination option.
 */
export function renderSearchingAndHandle(options: PaginationOptions): void {
  const input = document.querySelector<HTMLInputElement>('.search__form-input');
  const button = document.querySelector('.search__form-button');
  if (input === null || button === null) {
    return;
  }
  button.addEventListener('click', () => {
    const searchString = input.value;
    const optionsUpdated = new PaginationOptions({
      ...options,
      offset: DEFAULT_LIMIT,
      activePage: 1,
      search: searchString,
    });
    renderAnimeList(optionsUpdated);
  });
}
