import { asyncGetAnimeList } from '../scripts/fetchAnimeList';

const animeList = await asyncGetAnimeList(25, 25);

const container = document.querySelector('.container__list');

/**
 * Format date into dd/mm/yyyy .
 * @param str Date to format.
 */
function formatDate(str: Date): string {
  const newDate = new Date(str);
  return newDate.toLocaleDateString('en-us');
}

const htmlInsideContainer = animeList.results.map(element => (
  `
    <tr class="container__list_item">
      <th class="img" style="background-image: url(${element.image}) ;" ">
        <img src="${element.image}" alt="${element.title_eng}" />
      </th>
      <th>${element.title_eng}</th>
      <th>${element.title_jpn}</th>
      <th>${element.aired.start ? formatDate(element.aired.start) : ''}</th>
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

const paginationContainer = document.querySelector('.pagination');
const itemsPerPage = 25;
const offSet = 25;

/**
 * Render items of pagination .
 * @param activePage Active page to show items.
 */
function renderPageItems(activePage: number): string {
  const totalPage = animeList.count / itemsPerPage;
  let pageItemHTML = '';
  if (activePage <= 5) {
    for (let i = 1; i <= 5; i++) {
      pageItemHTML = pageItemHTML.concat(`<li class="waves-effect"><a href="#!">${i}</a></li>`, '');
    }
  }

  if (activePage > 5 && activePage < totalPage - 2) {
    for (let i = activePage - 2; i <= activePage + 2; i++) {
      pageItemHTML = pageItemHTML.concat(`<li class="waves-effect"><a href="#!">${i}</a></li>`, '');
    }
  }
  return pageItemHTML;
}

if (paginationContainer) {
  paginationContainer.innerHTML = `
    <li class="disabled"><a href="#!"><i class="material-icons">Previous</i></a></li>
    ${renderPageItems(1)}
    <li class="waves-effect"><a href="#!"><i class="material-icons">Next</i></a></li>
  `;
}
