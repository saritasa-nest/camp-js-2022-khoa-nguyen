import { Anime } from '@js-camp/core/models/anime';
import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Pagination } from '@js-camp/core/models/pagination';

import { DEFAULT_LIMIT } from '../constants';
import { fetchAnimeList } from '../service/api';

import { throwError } from '../utils';

/**
 * Render anime list.
 * @param options Options of pagination.
 */
export async function renderAnimeList(options: AnimeListQueryOptions): Promise<Pagination<Anime> | null> {
  const container = document.querySelector<HTMLTableElement>('.table');
  try {
    const optionUpdated = new AnimeListQueryOptions({
      ...options,
      offset: (options.activePage - 1) * DEFAULT_LIMIT,
    });
    const animeList = await fetchAnimeList(optionUpdated);

    if (container == null || animeList == null) {
      return null;
    }
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
    animeList.results.forEach(element => {
      const row = document.createElement('tr');
      row.classList.add('table__row');
      row.innerHTML = `
        <th class="table__cell table__cell_thumb">
          <img class= "table__image" src="${element.image}" alt="${element.titleEnglish}" />
        </th>
        <th class="table__cell">${element.titleEnglish}</th>
        <th class="table__cell">${element.titleJapanese}</th>
        <th class="table__cell">${element.aired.start ? element.aired.start.toLocaleDateString() : ''}</th>
        <th class="table__cell">${element.type}</th>
        <th class="table__cell">${element.status}</th>
    `;
      container.appendChild(row);
    });
    return animeList;
  } catch (error: unknown) {
    throwError(error, 'Failed to render anime list');
    return null;
  }
}
