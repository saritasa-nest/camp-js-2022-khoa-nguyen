import { constants } from '../constants';
import { asyncFetchAnimeList } from '../scripts/fetchAnimeList';

const container = document.querySelector('.container__table');
const selectSort = document.querySelector<HTMLSelectElement>('#selectSort');
const selectOrdering = document.querySelector<HTMLSelectElement>('#selectOrder');

const animeListInitial = await asyncFetchAnimeList(25, 25, constants.sortOptions[0].api);

const pagination = {
  limit: 25,
  offset: 25,
  activePage: 1,
  totalPage: animeListInitial.count / 25 - 1,
  sorting: constants.sortOptions[0].api,
  isAscending: true,
};

/**
 * Format date into mm/dd/yyyy.
 * @param str Date to format.
 */
function formatDate(str: Date): string {
  const newDate = new Date(str);
  return newDate.toLocaleDateString('en-us');
}

/**
 * Render anime list.
 */
async function renderAnimeList(): Promise<void> {
  try {
    pagination.offset = pagination.activePage * pagination.limit;
    const { limit, offset } = pagination;
    const animeList = await asyncFetchAnimeList(limit, offset, pagination.isAscending ? pagination.sorting : `-${pagination.sorting}`);
    const htmlInsideContainer = animeList.results.map(element => (
      `
        <tr class="container__list_item">
          <th class="img" style="background-image: url(${element.image}) ;" ">
            <img src="${element.image}" alt="${element.titleEng}" />
          </th>
          <th>${element.titleEng}</th>
          <th>${element.titleJapan}</th>
          <th>${element.airedStart ? formatDate(element.airedStart) : ''}</th>
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

/**
 * Render items of pagination .
 */
function renderPaginationItems(): string {
  let pageItemHTML = '';
  const { activePage, totalPage } = pagination;
  if (activePage < 5) {
    pageItemHTML = renderRangeOfPagination(activePage, 1, 5);
  } else if (activePage >= 5 && activePage <= totalPage - 4) {
    pageItemHTML = renderRangeOfPagination(activePage, activePage - 2, activePage + 2);
  } else if (activePage > totalPage - 4) {
    pageItemHTML = renderRangeOfPagination(activePage, totalPage - 4, totalPage);
  }
  return pageItemHTML;
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
      pagination.activePage = 1;
      pagination.offset = 25 * pagination.activePage;
      renderToUI();
    });

    btnLast?.addEventListener('click', () => {
      pagination.activePage = pagination.totalPage;
      pagination.offset = 25 * pagination.activePage;
      renderToUI();
    });

    if (pagination.activePage === pagination.totalPage) {
      btnLast?.classList.add('disabled');
    } else {
      btnLast?.classList.remove('disabled');
    }

    if (pagination.activePage === 1) {
      btnFirst?.classList.add('disabled');
    } else {
      btnFirst?.classList.remove('disabled');
    }
  }
}

/**
 * Init sorting and ordering list, hence render corresponding list anime.
 */
function initSortingAndOrdering(): void {
  const sortOptionsHTMl = constants.sortOptions.map(item => (
    `<option value="${item.title}">${item.title}</option>`
  )).join('');

  const orderOptionHTML = constants.orderOptions.map(item => (
    `<option value ="${item}">${item}</option>`
  )).join('');

  if (selectSort) {
    selectSort.innerHTML = sortOptionsHTMl;
    selectSort.addEventListener('change', () => {
        const { value } = selectSort;
        pagination.sorting = constants.sortOptions.filter(item => item.title === value)[0].api;
        pagination.offset = 25;
        pagination.activePage = 1;
        renderToUI();
      });
  }
  if (selectOrdering) {
    selectOrdering.innerHTML = orderOptionHTML;
    selectOrdering.addEventListener('change', () => {
      pagination.offset = 25;
      pagination.activePage = 1;
      pagination.isAscending = !pagination.isAscending;
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
          pagination.offset = 25 * numPage;
          pagination.activePage = numPage;
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
