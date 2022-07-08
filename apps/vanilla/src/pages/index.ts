import { formatDate } from '@js-camp/core/utils';

import { ORDER_OPTIONS, SORT_OPTIONS } from '../constants';
import { fetchAnimeList } from '../scripts/fetchAnimeList';

const container = document.querySelector('.container__table');
const selectSort = document.querySelector<HTMLSelectElement>('.select__sort');
const selectOrdering = document.querySelector<HTMLSelectElement>('.select__order');

const DEFAULT_LIMIT = 25;
const DEFAULT_OFFSET = DEFAULT_LIMIT;
const animeListInitial = await fetchAnimeList(DEFAULT_LIMIT, DEFAULT_OFFSET, SORT_OPTIONS[0].value);

const PAGINATION_OPTIONS = {
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
  activePage: 1,
  totalPage: animeListInitial.count / DEFAULT_LIMIT - 1,
  sorting: SORT_OPTIONS[0].value,
  isAscending: true,
};

/**
 * Render anime list.
 */
async function renderAnimeList(): Promise<void> {
  try {
    PAGINATION_OPTIONS.offset = PAGINATION_OPTIONS.activePage * PAGINATION_OPTIONS.limit;
    const { limit, offset } = PAGINATION_OPTIONS;
    const animeList = await fetchAnimeList(limit, offset, PAGINATION_OPTIONS.isAscending ?
      PAGINATION_OPTIONS.sorting : `-${PAGINATION_OPTIONS.sorting}`);
    const htmlInsideContainer = animeList.results.map(element => (
      `
        <tr class="container__list_item">
          <th class="img" style="background-image: url(${element.image}) ;" ">
            <img src="${element.image}" alt="${element.titleEnglish}" />
          </th>
          <th>${element.titleEnglish}</th>
          <th>${element.titleJapan}</th>
          <th>${element.aired.start ? formatDate(element.aired.start) : ''}</th>
          <th>${element.type}</th>
          <th>${element.status}</th>
        </tr>
      `
    )).join('');

    if (container) {
      container.innerHTML = `
      <caption>Anime list</caption>
      <table class="container__list">
        <tr class="container__list_item">
          <th>Thumbnail</th>
          <th>English title</th>
          <th>Japanese title</th>
          <th>Aired start</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
        ${htmlInsideContainer}
      </table>

    `;
    }
  } catch (error: unknown) {
    throw new Error(`Unable to render Anime list ${error}`);
  }
}

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

/**  Render items of pagination. */
function renderPaginationItems(): string {
  const { activePage, totalPage } = PAGINATION_OPTIONS;

  const FIRST_PAGE = 1;
  const PAGE_AT_INDEX_5 = 5;
  const PAGE_AT_INDEX_5_REVERSE = totalPage - 4;
  const PAGE_STEP = 2;

  if (activePage <= PAGE_STEP) {
    return renderRangeOfPagination(activePage, FIRST_PAGE, PAGE_AT_INDEX_5);
  } else if (activePage > PAGE_STEP && activePage < totalPage - PAGE_STEP) {
    return renderRangeOfPagination(activePage, activePage - PAGE_STEP, activePage + PAGE_STEP);
  } else if (activePage >= totalPage - PAGE_STEP) {
    return renderRangeOfPagination(activePage, PAGE_AT_INDEX_5_REVERSE, totalPage);
  }
  return '';
}

/**
 * Render pagination with buttons First and Last.
 */
function renderPagination(): void {
  if (paginationContainer) {
    paginationContainer.innerHTML = `
      <li id="btnFirst" class="btn waves-effect"><a href="#!"><i class="material-icons">First</i></a></li>
      ${renderPaginationItems()}
      <li id="btnLast" class="btn waves-effect"><a href="#!"><i class="material-icons">Last</i></a></li>
  `;
    const btnFirst = document.querySelector('#btnFirst');
    const btnLast = document.querySelector('#btnLast');

    btnFirst?.addEventListener('click', () => {
      PAGINATION_OPTIONS.activePage = 1;
      PAGINATION_OPTIONS.offset = DEFAULT_LIMIT * PAGINATION_OPTIONS.activePage;
      renderToUI();
    });

    btnLast?.addEventListener('click', () => {
      PAGINATION_OPTIONS.activePage = PAGINATION_OPTIONS.totalPage;
      PAGINATION_OPTIONS.offset = DEFAULT_LIMIT * PAGINATION_OPTIONS.activePage;
      renderToUI();
    });

    if (PAGINATION_OPTIONS.activePage === PAGINATION_OPTIONS.totalPage) {
      btnLast?.classList.add('disabled');
    } else {
      btnLast?.classList.remove('disabled');
    }

    if (PAGINATION_OPTIONS.activePage === 1) {
      btnFirst?.classList.add('disabled');
    } else {
      btnFirst?.classList.remove('disabled');
    }
  }
}

/** Init sorting and ordering list, hence render corresponding list anime. */
function initSortingAndOrdering(): void {
  const sortOptionHTML = SORT_OPTIONS.map(item => (
    `<option value="${item.title}">${item.title}</option>`
  )).join('');

  const orderOptionHTML = ORDER_OPTIONS.map(item => (
    `<option value ="${item}">${item}</option>`
  )).join('');

  if (selectSort) {
    selectSort.innerHTML = sortOptionHTML;
    selectSort.addEventListener('change', () => {
        const { value } = selectSort;
        PAGINATION_OPTIONS.sorting = SORT_OPTIONS.filter(item => item.title === value)[0].value;
        PAGINATION_OPTIONS.offset = DEFAULT_LIMIT;
        PAGINATION_OPTIONS.activePage = 1;
        renderToUI();
      });
  }
  if (selectOrdering) {
    selectOrdering.innerHTML = orderOptionHTML;
    selectOrdering.addEventListener('change', () => {
      PAGINATION_OPTIONS.offset = DEFAULT_LIMIT;
      PAGINATION_OPTIONS.activePage = 1;
      PAGINATION_OPTIONS.isAscending = !PAGINATION_OPTIONS.isAscending;
      renderToUI();
    });
  }
}

/**
 * Render anime list and pagination to UI.
 */
async function renderToUI(): Promise<void> {
  try {
    await renderAnimeList();
    renderPagination();
    const itemsPageList = document.querySelectorAll('.pagination li:not(.btn)');
    itemsPageList.forEach(item => {
      item.addEventListener('click', () => {
        const strPage = item.childNodes[0].childNodes[0].nodeValue;
        if (strPage) {
          const numPage = Number.parseInt(strPage, 10);
          PAGINATION_OPTIONS.offset = DEFAULT_LIMIT * numPage;
          PAGINATION_OPTIONS.activePage = numPage;
          renderToUI();
        }
      });
    });
  } catch (error: unknown) {
    throw new Error(`Unable to render UI ${error}`);
  }
}
initSortingAndOrdering();
renderToUI();
