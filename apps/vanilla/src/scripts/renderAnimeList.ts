import { formatDate } from '@js-camp/core/utils';

import { PaginationOptions } from '../interface/paginationInterface';

import { fetchAnimeList } from './fetchAnimeList';

const container = document.querySelector('.container__table');

/**
 * Render anime list.
 * @param options Options of pagination.
 */
export async function renderAnimeList(options: PaginationOptions): Promise<void> {
  try {
    options.offset = options.activePage * options.limit;
    const animeList = await fetchAnimeList(options);
    if (animeList instanceof Error) {
      return;
    }
    const htmlTableContent = animeList.results.map(element => (
      `
        <tr class="list__col">
          <th class="item_col wrapper__img" style="background-image: url(${element.image})">
            <img class= "wrapper__img_item" src="${element.image}" alt="${element.titleEnglish}" />
          </th>
          <th class="item_col">${element.titleEnglish}</th>
          <th class="item_col">${element.titleJapan}</th>
          <th class="item_col">${element.aired.start ? formatDate(element.aired.start) : ''}</th>
          <th class="item_col">${element.type}</th>
          <th class="item_col">${element.status}</th>
        </tr>
      `
    )).join('');

    if (container) {
      container.innerHTML = `
      <table>
        <caption>Anime list</caption>
        <tr class="list__col">
          <th class="item_col">Thumbnail</th>
          <th class="item_col">English title</th>
          <th class="item_col">Japanese title</th>
          <th class="item_col">Aired start</th>
          <th class="item_col">Type</th>
          <th class="item_col">Status</th>
        </tr>
        ${htmlTableContent}
      </table>

    `;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to render Anime list ${error.message}`);
    } else {
      throw new Error('Unexpected error!');
    }
  }
}
