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
    <div class="container__list_item">
    <div class="img" style="background-image: url(${element.image}) ;" ">
      <img src="${element.image}" alt="${element.title_eng}" />
    </div>
    <div class="content">
      <h3>${element.title_eng}</h3>
      <h3>${element.title_jpn}</h3>
      <h3>${element.aired.start ? formatDate(element.aired.start) : ''}</h3>
      <div class="content__typeAndStatus">
        <h3>${element.type}</h3>
        <h3>${element.status}</h3>
      </div>
    </div>
    </div>
  `
)).join('');

if (container) {
  container.innerHTML = htmlInsideContainer;
}
