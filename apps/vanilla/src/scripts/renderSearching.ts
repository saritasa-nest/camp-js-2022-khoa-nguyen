
import { KEY_SEARCHING } from '../constants';
import { LocalStorageService } from '../services/localStore';

import { INITIAL_PAGINATION } from './initAnimeTable';

import { renderListOnActivePage } from './renderPagination';

/**
 * Render search result to UI.
 */
export function renderSearchingAndHandle(): void {
  const input = document.querySelector<HTMLInputElement>('.search__form-input');
  const button = document.querySelector('.search__form-button');
  if (input == null || button == null) {
    return;
  }
  button.addEventListener('click', () => {
    const searchString = input.value;
    LocalStorageService.setValue(KEY_SEARCHING, searchString);
    renderListOnActivePage(INITIAL_PAGINATION);
  });
}
