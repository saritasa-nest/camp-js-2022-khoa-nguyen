import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { ProfileMapper } from '@js-camp/core/mappers/profile.mapper';
import { HttpError } from '@js-camp/core/models/httpError';
import { Profile } from '@js-camp/core/models/profile';
import { AxiosError } from 'axios';

import { appAxios } from '../../configs/axiosConfig';

import { PROFILE_API } from '../../constants';

/**
 * Get user information.
 */
export async function getProfile(): Promise<Profile | HttpError<null>> {
  try {
    const result = await appAxios.get(PROFILE_API);
    return ProfileMapper.fromDto(result.data);
  } catch (error: unknown) {
    const errorWithType = error as AxiosError<HttpErrorDto<null>>;
    if (errorWithType.response != null) {
      return HttpErrorMapper.fromDtoWithNull(errorWithType.response.data);
    }
    return new HttpError({ detail: 'Unknown error' });
  }
}