import { fetchAnimeDetail } from '../services/api/fetchAnimeDetail';

/** Get anime detail. */
export async function getAnimeDetail() {
  const animeDetail = await fetchAnimeDetail();
  renderDetailAnime(animeDetail);
}

/**
 * Render anime detail page.
 * @param anime Anime need to get detail.
 */
function renderDetailAnime(anime) {

}
