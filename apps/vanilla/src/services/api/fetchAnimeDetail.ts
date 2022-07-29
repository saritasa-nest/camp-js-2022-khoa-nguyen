import { AnimeDetailDto } from '@js-camp/core/dtos/animeDetail.dto';
import { AnimeDetailMapper } from '@js-camp/core/mappers/animeDetail.mapper';
import { AnimeDetail } from '@js-camp/core/models/animeDetail';

import { appAxios } from '../../configs';
import { KEY_ANIME } from '../../constants';

import { throwError } from '../../utils';
import { LocalStorageService } from '../localStore';
import { SearchParamsService } from '../searchParams';

/**
 * Fetch anime detail with id.
 */
export async function fetchAnimeDetail(): Promise<AnimeDetail | null> {
  try {
    const idFromLocalStore = LocalStorageService.getValue<string>(KEY_ANIME);
    if (idFromLocalStore != null) {
      if (SearchParamsService.getSearchParams().animeId == null) {
        SearchParamsService.setSearchParamToUrl(KEY_ANIME, idFromLocalStore);
      }
    }
    const urlParams = SearchParamsService.getSearchParams();
    const idFromUrl = urlParams.animeId;
    const result = await appAxios.get<AnimeDetailDto>(`anime/anime/${idFromUrl}/`);
    return AnimeDetailMapper.fromDto(result.data);
  } catch (error: unknown) {
    throwError(error, 'Unable to get anime data');
    return null;
  }
}
