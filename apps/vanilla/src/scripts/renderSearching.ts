import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';

import { DEFAULT_LIMIT, DEFAULT_SEARCH, KEY_SEARCHING } from '../constants';
import { LocalStorageService } from '../service/localStorage';

import { renderAnimeList } from './renderAnimeList';

/**
 * Render search result to UI.
 * @param options Pagination option.
 */
export function handleSearch(options: AnimeListQueryOptions): void {
  const form = document.querySelector<HTMLFormElement>('.form');
  if (form === null) {
    return;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchString = formData.get('search')?.toString() ?? DEFAULT_SEARCH;
    LocalStorageService.setValue(KEY_SEARCHING, searchString);
    const optionsUpdated = new AnimeListQueryOptions({
      ...options,
      offset: DEFAULT_LIMIT,
      activePage: 1,
      search: searchString,
    });
    renderAnimeList(optionsUpdated);
  });
}
