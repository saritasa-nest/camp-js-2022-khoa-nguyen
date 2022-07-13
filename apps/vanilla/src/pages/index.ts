import { OrderOption, SortTitle, SortValue } from '@js-camp/core/enum';
import { formatDate } from '@js-camp/core/utils';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, SORT_OPTIONS } from '../constants';
import { PaginationOptions } from '../interface/paginationInterface';
import { fetchAnimeList } from '../scripts/fetchAnimeList';

const container = document.querySelector('.container__table');
const selectSort = document.querySelector<HTMLSelectElement>('.select__sort');
const selectOrdering = document.querySelector<HTMLSelectElement>('.select__order');

const INITIAL_PAGINATION: PaginationOptions = {
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
  activePage: DEFAULT_ACTIVE_PAGE,
  totalPages: 0,
  sorting: {
    title: SortTitle.TitleEnglish,
    value: SortValue.TitleEnglish,
  },
  isAscending: true,
};

const animeListInitial = await fetchAnimeList(INITIAL_PAGINATION);

const PAGINATION_OPTIONS: PaginationOptions = {
  ...INITIAL_PAGINATION,
  totalPages: animeListInitial instanceof Error ? 0 : Math.ceil(animeListInitial.count / DEFAULT_LIMIT) - 1,
};

/**
 * Render anime list.
 */
async function renderAnimeList(): Promise<void> {
  try {
    PAGINATION_OPTIONS.offset = PAGINATION_OPTIONS.activePage * PAGINATION_OPTIONS.limit;
    const animeList = await fetchAnimeList(PAGINATION_OPTIONS);
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
  const { activePage, totalPages } = PAGINATION_OPTIONS;
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
 */
function renderPagination(): void {
  if (paginationContainer) {
    paginationContainer.innerHTML = `
      <li class="button__first waves-effect"><a href="#!"><i class="material-icons">First</i></a></li>
      ${renderPaginationItems()}
      <li class="button__last waves-effect"><a href="#!"><i class="material-icons">Last</i></a></li>
  `;
    const buttonFirstPage = document.querySelector('.button__first');
    const buttonLastPage = document.querySelector('.button__last');

    buttonFirstPage?.addEventListener('click', () => {
      PAGINATION_OPTIONS.activePage = 1;
      PAGINATION_OPTIONS.offset = DEFAULT_LIMIT * PAGINATION_OPTIONS.activePage;
      renderListAndPaginationToUI();
    });

    buttonLastPage?.addEventListener('click', () => {
      PAGINATION_OPTIONS.activePage = PAGINATION_OPTIONS.totalPages;
      PAGINATION_OPTIONS.offset = DEFAULT_LIMIT * PAGINATION_OPTIONS.activePage;
      renderListAndPaginationToUI();
    });

    if (PAGINATION_OPTIONS.activePage === PAGINATION_OPTIONS.totalPages) {
      buttonLastPage?.classList.add('disabled');
    } else {
      buttonLastPage?.classList.remove('disabled');
    }

    if (PAGINATION_OPTIONS.activePage === 1) {
      buttonFirstPage?.classList.add('disabled');
    } else {
      buttonFirstPage?.classList.remove('disabled');
    }
  }
}

/** Init sorting and ordering list, hence render corresponding list anime. */
function initSortingAndOrdering(): void {
  const sortOptionHTML = SORT_OPTIONS.map(item => (
    `<option value="${item.title}">${item.title}</option>`
  )).join('');

  const orderOptionHTML = Object.keys(OrderOption).map(item => (
    `<option value ="${item}">${item}</option>`
  ))
    .join('');

  if (selectSort) {
    selectSort.innerHTML = sortOptionHTML;
    selectSort.addEventListener('change', () => {
        const { value } = selectSort;
        PAGINATION_OPTIONS.sorting.value = SORT_OPTIONS.filter(item => item.title === value)[0].value as SortValue;
        PAGINATION_OPTIONS.offset = DEFAULT_LIMIT;
        PAGINATION_OPTIONS.activePage = 1;
        renderListAndPaginationToUI();
      });
  }
  if (selectOrdering) {
    selectOrdering.innerHTML = orderOptionHTML;
    selectOrdering.addEventListener('change', () => {
      PAGINATION_OPTIONS.offset = DEFAULT_LIMIT;
      PAGINATION_OPTIONS.activePage = 1;
      PAGINATION_OPTIONS.isAscending = !PAGINATION_OPTIONS.isAscending;
      renderListAndPaginationToUI();
    });
  }
}

/**
 * Render anime list and pagination to UI.
 */
async function renderListAndPaginationToUI(): Promise<void> {
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
          renderListAndPaginationToUI();
        }
      });
    });
  } catch (error: unknown) {
    throw new Error(`Unable to render UI ${error as string}`);
  }
}
initSortingAndOrdering();
renderListAndPaginationToUI();
