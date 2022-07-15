import { OrderOption } from '@js-camp/core/enum';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { Sorting } from '@js-camp/core/models/sorting';
import { formatDate } from '@js-camp/core/utils';

import { SORT_OPTIONS } from '../constants';

import { KEY_ORDER, KEY_SORTING } from '../constants/key';
import { getValueFromLocalStorage } from '../service/localStorage';

import { fetchAnimeList } from './fetchAnimeList';

const container = document.querySelector('.table');

/**
 * Render anime list.
 * @param options Options of pagination.
 */
export async function renderAnimeList(options: PaginationOptions): Promise<Pagination<Anime>> {
  try {
    const optionUpdated = new PaginationOptions({
      ...options,
      sorting: new Sorting({
        ...getValueFromLocalStorage<Sorting>(KEY_SORTING) ?? SORT_OPTIONS[0],
        isAscending: (getValueFromLocalStorage<OrderOption>(KEY_ORDER) === null ||
        getValueFromLocalStorage<OrderOption>(KEY_ORDER) === OrderOption.Ascending),
      }),
      offset: (options.activePage - 1) * options.limit,
    });
    const animeList = await fetchAnimeList(optionUpdated);

    const htmlTableContent = animeList.results.map(element => (
      `
        <tr class="table__row">
          <th class="table__row_item table__row_item_thumb">
            <img class= "table__row_item_thumb__img" src="${element.image}" alt="${element.titleEnglish}" />
          </th>
          <th class="table__row_item">${element.titleEnglish}</th>
          <th class="table__row_item">${element.titleJapan}</th>
          <th class="table__row_item">${element.aired.start ? formatDate(element.aired.start) : ''}</th>
          <th class="table__row_item">${element.type}</th>
          <th class="table__row_item">${element.status}</th>
        </tr>
      `
    )).join('');

    if (container) {
      container.innerHTML = `
      <table>
        <caption class="table__caption" >Anime list</caption>
        <tr class="table__row">
          <th class="table__row_item">Thumbnail</th>
          <th class="table__row_item">English title</th>
          <th class="table__row_item">Japanese title</th>
          <th class="table__row_item">Aired start</th>
          <th class="table__row_item">Type</th>
          <th class="table__row_item">Status</th>
        </tr>
        ${htmlTableContent}
      </table>

    `;
    }
    return animeList;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to render Anime list ${error.message}`);
    } else {
      throw new Error('Unexpected error!');
    }
  }
}
