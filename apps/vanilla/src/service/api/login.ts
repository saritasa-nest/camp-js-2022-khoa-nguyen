import { ErrorLoginDto } from '@js-camp/core/dtos/login.dto';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { ErrorLoginMapper, LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { HttpError } from '@js-camp/core/models/httpError';
import { ErrorLogin, Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';

import { appAxios } from '../../configs';
import { getError } from '../../scripts/getError';

const LOGIN_URL = 'auth/login/';

/**
 * Perform login action.
 * @param userLoginInfo Login info of user.
 */
export async function login(userLoginInfo: Login): Promise<Token | HttpError<ErrorLogin | null>> {
  try {
    const userLoginDto = LoginMapper.toDto(userLoginInfo);
    const response = await appAxios.post<TokenDto>(LOGIN_URL, { ...userLoginDto });
    return TokenMapper.fromDto(response.data);
  } catch (error: unknown) {
    return getError<ErrorLoginDto, ErrorLogin>(error, ErrorLoginMapper.fromDto);
  }
}
