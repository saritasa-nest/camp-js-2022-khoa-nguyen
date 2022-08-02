import { Anime } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';
import { navigate } from '@js-camp/core/utils';

import { DEFAULT_LIMIT, DETAIL_URL } from '../constants';

import { KEY_ANIME } from '../constants/key';
import { LocalStorageService } from '../services/localStore';

import { throwError } from '../utils';

import { fetchAnimeList } from '../services/api/fetchAnimeList';
import { AuthorizationService } from '../services/authorization';

/**
 * Move to detail anime.
 * @param id Id of anime.
 */
export function moveToDetail(id: number): void {
  LocalStorageService.setValue(KEY_ANIME, id);
  navigate(DETAIL_URL);
}

/**
 * Render anime list.
 * @param options Options of pagination.
 */
export async function renderAnimeList(options: AnimeListQueryOptions): Promise<Pagination<Anime> | null> {
  const container = document.querySelector<HTMLTableElement>('.table');
  const isLoggedIn = await AuthorizationService.isLoggedIn();
  try {
    const optionUpdated = new AnimeListQueryOptions({
      ...options,
      offset: (options.activePage - 1) * DEFAULT_LIMIT,
    });
    const animeList = await fetchAnimeList(optionUpdated);

    if (container != null) {
      container.innerHTML = `
        <tr class="table__row">
          <th class="table__cell">Thumbnail</th>
          <th class="table__cell">English title</th>
          <th class="table__cell">Japanese title</th>
          <th class="table__cell">Aired start</th>
          <th class="table__cell">Type</th>
          <th class="table__cell">Status</th>
        </tr>
    `;
    }
    animeList?.results.forEach(element => {
      const row = document.createElement('tr');
      row.classList.add('table__row');
      row.innerHTML = `
        <th class="table__cell table__cell_thumb">
          <img class= "table__image" src="${element.image}" alt="${element.titleEnglish}" />
        </th>
        <th class="table__cell">${element.titleEnglish}</th>
        <th class="table__cell">${element.titleJapan}</th>
        <th class="table__cell">${element.aired.start ? element.aired.start.toLocaleDateString() : ''}</th>
        <th class="table__cell">${element.type}</th>
        <th class="table__cell">${element.status}</th>
    `;
      if (isLoggedIn) {
        row.addEventListener('click', () => moveToDetail(element.id));
      }
      container?.appendChild(row);
    });
    return animeList;
  } catch (error: unknown) {
    throwError(error, 'Failed to render anime list');
    return null;
  }
}
