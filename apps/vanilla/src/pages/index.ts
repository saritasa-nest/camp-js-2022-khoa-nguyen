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
