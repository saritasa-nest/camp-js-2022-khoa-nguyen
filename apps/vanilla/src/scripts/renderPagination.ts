import { PaginationOptions } from '@js-camp/core/models/paginationOptions';

import { DEFAULT_LIMIT, DEFAULT_SEARCH, DEFAULT_TOTAL_PAGE, FIRST_PAGE, KEY_SEARCHING, PAGE_RANGE, PAGE_STEP } from '../constants';
import { LocalStorageService } from '../services/localStore';

import { throwError } from '../utils';

import { renderAnimeList } from './renderAnimeList';

const paginationContainer = document.querySelector('.pagination');

/**
 * Render range of pagination.
 * @param activePage Page selected.
 * @param from First index of pagination.
 * @param to Last index of pagination.
 */
function renderRangeOfPagination(activePage: number, from: number, to: number): string {
  let innerHTML = '';
  for (let i = from; i <= to; i++) {
    innerHTML = innerHTML.concat(`<li class="waves-effect ${activePage === i ? 'active' : ''}"><a>${i}</a></li>`, '');
  }
  return innerHTML;
}

/**  Render items of pagination.
 * @param options Options of pagination.
 */
function renderPaginationItems(options: PaginationOptions): string {
  const { activePage, totalPages } = options;

  if (totalPages === DEFAULT_TOTAL_PAGE) {
    return '';
  }
  if (totalPages < PAGE_RANGE) {
    return renderRangeOfPagination(activePage, FIRST_PAGE, activePage);
  }
  if (activePage <= PAGE_STEP) {
    return renderRangeOfPagination(activePage, FIRST_PAGE, PAGE_RANGE);
  }
  if (activePage > PAGE_STEP && activePage < totalPages - PAGE_STEP) {
    return renderRangeOfPagination(activePage, activePage - PAGE_STEP, activePage + PAGE_STEP);
  }
  if (activePage >= totalPages - PAGE_STEP) {
    return renderRangeOfPagination(activePage, totalPages - PAGE_STEP * 2, totalPages);
  }
  return '';
}

/**
 * Render pagination with buttons First and Last.
 * @param options Options of pagination.
 */
function renderPagination(options: PaginationOptions): void {
  if (paginationContainer == null) {
    return;
  }
  paginationContainer.innerHTML = `
      <li class="button__first waves-effect"><a href="#!"><i class="material-icons">First</i></a></li>
      ${renderPaginationItems(options)}
      <li class="button__last waves-effect"><a href="#!"><i class="material-icons">Last</i></a></li>
  `;
  const buttonFirstPage = document.querySelector('.button__first');
  const buttonLastPage = document.querySelector('.button__last');

  buttonFirstPage?.addEventListener('click', () => {
      const optionUpdated = new PaginationOptions({
        ...options,
        activePage: 1,
        offset: DEFAULT_LIMIT * (options.activePage - 1),
        search: LocalStorageService.getValue(KEY_SEARCHING) ?? DEFAULT_SEARCH,
      });
      renderListOnActivePage(optionUpdated);
    });

  buttonLastPage?.addEventListener('click', () => {
      const optionUpdated = new PaginationOptions({
        ...options,
        activePage: options.totalPages,
        offset: DEFAULT_LIMIT * (options.activePage - 1),
        search: LocalStorageService.getValue(KEY_SEARCHING) ?? DEFAULT_SEARCH,
      });
      renderListOnActivePage(optionUpdated);
    });

  if (options.activePage === options.totalPages) {
    buttonLastPage?.classList.add('disabled');
  } else {
    buttonLastPage?.classList.remove('disabled');
  }

  if (options.activePage === 1) {
    buttonFirstPage?.classList.add('disabled');
  } else {
    buttonFirstPage?.classList.remove('disabled');
  }
}

/**
 * Render anime list and pagination to UI.
 * @param options Options of pagination.
 */
export async function renderListOnActivePage(options: PaginationOptions): Promise<void> {
  try {
    const animeList = await renderAnimeList(options);
    if (animeList == null) {
      throw new Error('Anime list is null');
    }
    const optionUpdated = new PaginationOptions({
      ...options,
      totalPages: Math.ceil(animeList.count / DEFAULT_LIMIT),
    });
    renderPagination(optionUpdated);
    const itemsPageList = document.querySelectorAll('.pagination li:not(.btn)');
    itemsPageList.forEach(item => {
      item.addEventListener('click', () => {
        const strPage = item.childNodes[0].childNodes[0].nodeValue;
        if (strPage == null) {
          return;
        }
        const numPage = Number.parseInt(strPage, 10);
        const optionUpdatedTrigger = new PaginationOptions({
          ...options,
          offset: DEFAULT_LIMIT * (numPage - 1),
          activePage: numPage,
          search: LocalStorageService.getValue(KEY_SEARCHING) ?? DEFAULT_SEARCH,
        });
        renderListOnActivePage(optionUpdatedTrigger);
      });
    });
  } catch (error: unknown) {
    throwError(error, 'Failed to load pagination');
  }
}
