import { PaginationOptions } from '@js-camp/core/models/paginationOptions';

import { DEFAULT_LIMIT } from '../constants';

import { throwError } from './getError';

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
  const FIRST_PAGE = 1;
  const PAGE_RANGE = 5;
  const PAGE_STEP = 2;

  if (activePage <= PAGE_STEP) {
    return renderRangeOfPagination(activePage, FIRST_PAGE, PAGE_RANGE);
  } else if (activePage > PAGE_STEP && activePage < totalPages - PAGE_STEP) {
    return renderRangeOfPagination(activePage, activePage - PAGE_STEP, activePage + PAGE_STEP);
  } else if (activePage >= totalPages - PAGE_STEP) {
    return renderRangeOfPagination(activePage, totalPages - PAGE_STEP * 2, totalPages);
  }
  return '';
}

/**
 * Render pagination with buttons First and Last.
 * @param options Options of pagination.
 */
function renderPagination(options: PaginationOptions): void {
  if (paginationContainer === null || paginationContainer === undefined) {
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
        offset: DEFAULT_LIMIT * options.activePage,
      });
      renderListAnimeWithActivePage(optionUpdated);
    });

  buttonLastPage?.addEventListener('click', () => {
      const optionUpdated = new PaginationOptions({
        ...options,
        activePage: options.totalPages,
        offset: DEFAULT_LIMIT * options.activePage,
      });
      renderListAnimeWithActivePage(optionUpdated);
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
export async function renderListAnimeWithActivePage(options: PaginationOptions): Promise<void> {
  try {
    const animeList = await renderAnimeList(options);
    const optionUpdated = new PaginationOptions({
      ...options,
      totalPages: Math.ceil(animeList.count / options.limit - 1),
    });
    renderPagination(optionUpdated);
    const itemsPageList = document.querySelectorAll('.pagination li:not(.btn)');
    itemsPageList.forEach(item => {
      item.addEventListener('click', () => {
        const strPage = item.childNodes[0].childNodes[0].nodeValue;
        if (strPage === null || strPage === undefined) {
          return;
        }
        const numPage = Number.parseInt(strPage, 10);
        const optionUpdatedTrigger = new PaginationOptions({
          ...options,
          offset: DEFAULT_LIMIT * numPage,
          activePage: numPage,
        });
        renderListAnimeWithActivePage(optionUpdatedTrigger);
      });
    });
  } catch (error: unknown) {
    throwError(error, 'Unable to render UI ');
  }
}
