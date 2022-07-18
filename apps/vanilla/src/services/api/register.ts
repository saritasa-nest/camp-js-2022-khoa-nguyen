import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { ErrorUserDto } from '@js-camp/core/dtos/user.dto';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { ErrorUserMapper, UserMapper } from '@js-camp/core/mappers/user.mapper';
import { HttpError } from '@js-camp/core/models/httpError';
import { Token } from '@js-camp/core/models/token';
import { ErrorUser, User } from '@js-camp/core/models/user';

import { appAxios } from '../../axios';
import { getError } from '../../scripts/getError';

const REGISTER_URL = 'auth/register/';

/**
 * Register new user.
 * @param userInfo Registration info of user.
 */
export async function registerNewUser(userInfo: User): Promise<Token | HttpError<ErrorUser | null>> {
  try {
    const userDto = UserMapper.toDto(userInfo);
    const response = await appAxios.post<TokenDto>(REGISTER_URL, { ...userDto });
    return TokenMapper.fromDto(response.data);
  } catch (error: unknown) {
    return getError<ErrorUserDto, ErrorUser>(error, ErrorUserMapper.fromDto);
  }
}
