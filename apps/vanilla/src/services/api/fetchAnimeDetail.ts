import { AnimeDetailDto } from '@js-camp/core/dtos/animeDetail';
import { AnimeDetailMapper } from '@js-camp/core/mappers/animeDetail.mapper';
import { AnimeDetail } from '@js-camp/core/models/animeDetail';
import { navigate } from '@js-camp/core/utils';

import { appAxios } from '../../configs';
import { HOME_URL, KEY_ANIME } from '../../constants';

import { throwError } from '../../utils';
import { LocalStorageService } from '../localStore';

/**
 * Fetch anime detail with id.
 */
export async function fetchAnimeDetail(): Promise<AnimeDetail | null> {
  try {
    const id = LocalStorageService.getValue<string>(KEY_ANIME);
    if (id == null) {
      navigate(HOME_URL);
    }
    const result = await appAxios.get<AnimeDetailDto>(`anime/anime/${id}/`);
    return AnimeDetailMapper.fromDto(result.data);
  } catch (error: unknown) {
    throwError(error, 'Unable to get anime data');
    return null;
  }
}
