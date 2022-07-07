import { asyncGetAnimeList } from '../scripts/fetchAnimeList';

const container = document.querySelector('.container__list');

const animeListInitial = await asyncGetAnimeList(25, 25);

const pagination = {
  limit: 25,
  offset: 25,
  activePage: 1,
  totalPage: animeListInitial.count / 25 - 1,
};

/**
 * Format date into dd/mm/yyyy .
 * @param str Date to format.
 */
function formatDate(str: Date): string {
  const newDate = new Date(str);
  return newDate.toLocaleDateString('en-us');
}

/**
 * Format date into dd/mm/yyyy .
 */
async function renderAnimeList(): Promise<void> {
  const { limit, offset } = pagination;
  const animeList = await asyncGetAnimeList(limit, offset);
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
      <tr class="container__list_item">
        <th>Thumbnail</th>
        <th>English title</th>
        <th>Japanese title</th>
        <th>Aired start</th>
        <th>Type</th>
        <th>Status</th>
      </tr>
      ${htmlInsideContainer}

  `;
  }
}

const paginationContainer = document.querySelector('.pagination');

/**
 * Render items of pagination .
 */
function renderPageItems(): string {
  const { activePage, totalPage } = pagination;
  let pageItemHTML = '';
  if (activePage < 5) {
    for (let i = 1; i <= 5; i++) {
      pageItemHTML = pageItemHTML.concat(`<li class="waves-effect ${activePage === i ? 'active' : ''}"><a>${i}</a></li>`, '');
    }
  } else if (activePage >= 5 && activePage < totalPage - 2) {
    for (let i = activePage - 2; i <= activePage + 2; i++) {
      pageItemHTML = pageItemHTML.concat(`<li class="waves-effect ${activePage === i ? 'active' : ''}"><a>${i}</a></li>`, '');
    }
  } else if (activePage > totalPage - 5) {
    for (let i = totalPage - 5; i <= totalPage; i++) {
      pageItemHTML = pageItemHTML.concat(`<li class="waves-effect ${activePage === i ? 'active' : ''}"><a>${i}</a></li>`, '');
    }
  }
  return pageItemHTML;
}

/**
 * Render pagination.
 */
function renderPagination(): void {
  if (paginationContainer) {
    paginationContainer.innerHTML = `
      <li id="btnFirst" class="btn waves-effect"><a href="#!"><i class="material-icons">First</i></a></li>
      ${renderPageItems()}
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
 * Render pagination into UI.
 */
async function renderToUI(): Promise<void> {
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
}

renderToUI();
