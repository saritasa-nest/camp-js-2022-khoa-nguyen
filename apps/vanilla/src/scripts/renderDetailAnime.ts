import { AnimeDetail } from '@js-camp/core/models/animeDetail';
import { HttpError } from '@js-camp/core/models/httpError';
import { navigate } from '@js-camp/core/utils';

import { LOGIN_URL } from '../constants';

import { fetchAnimeDetail } from '../services/api/fetchAnimeDetail';
import { AuthorizationService } from '../services/authorization';

/** Get anime detail. */
export async function getAnimeDetail(): Promise<void> {
  if (await AuthorizationService.isLoggedIn()) {
    const animeDetail = await fetchAnimeDetail();
    renderDetailAnime(animeDetail);
    return;
  }
  navigate(LOGIN_URL);
}

const detailWrapper = document.querySelector<HTMLDivElement>('.detail');

/**
 * Render anime detail page.
 * @param anime Anime need to get detail.
 */
function renderDetailAnime(anime: AnimeDetail | null): void {
  if (detailWrapper == null) {
    return;
  }
  if (anime instanceof HttpError || anime == null) {
    detailWrapper.innerHTML = `
      <h1>Unknown Anime</h1>
    `;
    return;
  }

  const htmlStudiosList = anime.studiosData.map(studio => `
      <h2>${studio.name}</h2>
  `).join('');

  const htmlGenreList = anime.genresData.map(genre => `
      <h2>${genre.name}</h2>
  `).join('');

  detailWrapper.innerHTML += `
    <div class="detail__image">
      <img class="detail__image_img" src= "${anime.image}"/>
    </div>
    <div class="detail__trailer">
      <button class ="button button__trailer" type="button">Watch trailer</button>
    </div>
    <div class="detail__content">
      <h1 class="detail__title">${anime.titleEnglish}</h1>
      <h1 class="detail__title">${anime.titleJapan}</h1>
      <div class="detail__content_aired">
      <h2>Start date: ${anime.aired.start != null ? anime.aired.start.toLocaleDateString() : 'Unknown'}</h2>
      <h2>End date: ${anime.aired.end != null ? anime.aired.end.toLocaleDateString() : 'Unknown'}</h2>
      <h3>Status: ${anime.status.toUpperCase()}</h3>
      <h3>Type: ${anime.type.toUpperCase()}</h3>
      <h3 class="detail__title_small">List studio</h3>
      <div class="detail__content_studio">
        ${htmlStudiosList}
      </div>
      <h3 class="detail__title_small">List genres</h3>
      <div class="detail__content_studio">
        ${htmlGenreList}
      </div>
    </div>
    `;
  const imageElement = detailWrapper.querySelector<HTMLDivElement>('.detail__image');
  const buttonTrailer = detailWrapper.querySelector<HTMLButtonElement>('.button__trailer');
  if (imageElement == null) {
    return;
  }
  imageElement.addEventListener('click', () => expandImage(imageElement));
  buttonTrailer?.addEventListener('click', () => renderPopupTrailer(anime.trailerYoutubeId));
}

/**
 * Render anime detail page.
 * @param imageElement Image to scale.
 */
function expandImage(imageElement: HTMLDivElement): void {
  if (imageElement.classList.contains('scale')) {
    imageElement.classList.remove('scale');
    return;
  }
  imageElement.classList.add('scale');
}

/**
 * Display popup trailer.
 * @param trailerID Trailer ID of anime.
 */
function renderPopupTrailer(trailerID: string | null): void {
  if (trailerID == null) {
    return;
  }
  const modalPopup = document.createElement('div');
  modalPopup.classList.add('detail__popup');
  modalPopup.innerHTML = `
    <div class="detail__popup_inner">
      <button class="button button__popup_close">X</button>
      <iframe class="detail__iframe" src="https://www.youtube.com/embed/${trailerID}"/>
    </div>
  `;
  detailWrapper?.appendChild(modalPopup);
  modalPopup.querySelector('.button__popup_close')?.addEventListener('click', () => {
    modalPopup.classList.add('detail__popup_hidden');
  });
}
