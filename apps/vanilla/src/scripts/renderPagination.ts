import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';

import { DEFAULT_LIMIT, DEFAULT_TOTAL_PAGE, FIRST_PAGE, KEY_ACTIVE_PAGE, PAGE_RANGE, PAGE_STEP } from '../constants';
import { SearchParamsService } from '../service';

import { throwError } from '../utils';

import { getInitialQueryParams } from './initAnimeTable';

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
    innerHTML = innerHTML.concat(`<button class="button__pagination ${activePage === i ? 'button_active' : ''}">${i}</button>`, '');
  }
  return innerHTML;
}

/**
 * Render items of pagination.
 * @param options Options of pagination.
 */
function renderPaginationItems(options: AnimeListQueryOptions): string {
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
function renderPagination(options: AnimeListQueryOptions): void {
  if (paginationContainer == null) {
    return;
  }
  paginationContainer.innerHTML = `
  <button class="button__pagination_first">First</button>
  ${renderPaginationItems(options)}
  <button class="button__pagination_last">Last</button>
  `;
  const buttonFirstPage = document.querySelector<HTMLButtonElement>('.button__pagination_first');
  const buttonLastPage = document.querySelector<HTMLButtonElement>('.button__pagination_last');
  if (buttonFirstPage == null || buttonLastPage == null) {
    return;
  }

  /**
   * Render pagination with buttons First and Last.
   * @param pageActive Active page.
   * @param element Element to remove click event.
   */
  function handleMoveToPageSide(element: HTMLButtonElement, pageActive: string): EventListener {
    return () => {
      SearchParamsService.setSearchParamToUrl(KEY_ACTIVE_PAGE, pageActive);
      renderListOnActivePage(getInitialQueryParams());
      element?.removeEventListener('click', handleMoveToPageSide(element, FIRST_PAGE.toString()));
    };
  }

  buttonFirstPage.addEventListener('click', handleMoveToPageSide(buttonFirstPage, FIRST_PAGE.toString()));
  buttonLastPage.addEventListener('click', handleMoveToPageSide(buttonLastPage, options.totalPages.toString()));

  if (options.activePage === options.totalPages) {
    buttonLastPage.classList.add('button_disable');
    buttonLastPage.disabled = true;
  } else {
    buttonLastPage.classList.remove('button_disable');
    buttonLastPage.disabled = false;
  }

  if (options.activePage === 1) {
    buttonFirstPage.classList.add('button_disable');
    buttonFirstPage.disabled = true;

  } else {
    buttonFirstPage?.classList.remove('button_disable');
    buttonFirstPage.disabled = false;

  }
}

/**
 * Render anime list and pagination to UI.
 * @param options Options of pagination.
 */
export async function renderListOnActivePage(options: AnimeListQueryOptions): Promise<void> {
  try {
    const animeList = await renderAnimeList(options);
    if (animeList == null) {
      throw new Error('Anime list is null');
    }
    const optionUpdated = new AnimeListQueryOptions({
      ...options,
      totalPages: Math.ceil(animeList.count / DEFAULT_LIMIT),
    });
    renderPagination(optionUpdated);
    const itemsPageList = document.querySelectorAll('.pagination .button__pagination');
    itemsPageList.forEach(item => {

      /** Handle click event in pagination items. */
      function handlePaginationItemClicked(): void {
          const strPage = item.childNodes[0].nodeValue;
          if (strPage == null) {
            return;
          }
          const numPage = Number.parseInt(strPage, 10);
          SearchParamsService.setSearchParamToUrl(KEY_ACTIVE_PAGE, numPage.toString());
          renderListOnActivePage(getInitialQueryParams());
          item.removeEventListener('click', handlePaginationItemClicked);
      }
      item.addEventListener('click', handlePaginationItemClicked);
    });
  } catch (error: unknown) {
    throwError(error, 'Failed to load pagination');
  }
}
