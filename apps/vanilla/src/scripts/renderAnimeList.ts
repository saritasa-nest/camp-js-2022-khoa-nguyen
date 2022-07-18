import { OrderOption, TypeModel } from '@js-camp/core/enum';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationOptions } from '@js-camp/core/models/paginationOptions';
import { Sorting } from '@js-camp/core/models/sorting';
import { formatDate } from '@js-camp/core/utils';

import { DEFAULT_LIMIT, SORT_OPTIONS } from '../constants';

import { KEY_ORDER, KEY_SORTING, KEY_TYPE } from '../constants/key';
import { LocalStorageService } from '../services/localStore';

import { throwError } from '../utils';

import { fetchAnimeList } from '../services/api/fetchAnimeList';
import { AuthorizationService } from '../services/authorization';

// /**
//  * Move to detail anime.
//  * @param id Id of anime.
//  */
// export async function moveToDetail(id: string) {
//   if (AuthorizationService.isLoggedIn()) {

//   } else {

//   }
// }

/**
 * Move to detail anime.
 * @param id Id of anime.
 */
export function moveToDetail(id: number) {
  console.log(id);
}

/**
 * Render anime list.
 * @param options Options of pagination.
 */
export async function renderAnimeList(options: PaginationOptions): Promise<Pagination<Anime> | null> {
  const container = document.querySelector('.table');
  try {
    const optionUpdated = new PaginationOptions({
      ...options,
      sorting: new Sorting({
        ...LocalStorageService.getValue<Sorting>(KEY_SORTING) ?? SORT_OPTIONS[0],
        isAscending: (LocalStorageService.getValue<OrderOption>(KEY_ORDER) == null ||
        LocalStorageService.getValue<OrderOption>(KEY_ORDER) === OrderOption.Ascending),
      }),
      type: LocalStorageService.getValue<TypeModel>(KEY_TYPE) ?? TypeModel.Default,
      offset: (options.activePage - 1) * DEFAULT_LIMIT,
    });
    const animeList = await fetchAnimeList(optionUpdated);

    if (container != null) {
      container.innerHTML = `
        <tr class="table__row">
          <th class="table__row_item">Thumbnail</th>
          <th class="table__row_item">English title</th>
          <th class="table__row_item">Japanese title</th>
          <th class="table__row_item">Aired start</th>
          <th class="table__row_item">Type</th>
          <th class="table__row_item">Status</th>
        </tr>
    `;
    }
    animeList?.results.forEach(element => {
      const row = document.createElement('tr');
      row.classList.add('table__row');
      row.innerHTML = `
        <th class="table__row_item table__row_item_thumb">
          <img class= "table__row_item_thumb__img" src="${element.image}" alt="${element.titleEnglish}" />
        </th>
        <th class="table__row_item">${element.titleEnglish}</th>
        <th class="table__row_item">${element.titleJapan}</th>
        <th class="table__row_item">${element.aired.start ? formatDate(element.aired.start) : ''}</th>
        <th class="table__row_item">${element.type}</th>
        <th class="table__row_item">${element.status}</th>
    `;
      row.addEventListener('click', () => moveToDetail(element.id));
      container?.appendChild(row);
    });

    return animeList;
  } catch (error: unknown) {
    throwError(error, 'Failed to render anime list');
    return null;
  }
}
