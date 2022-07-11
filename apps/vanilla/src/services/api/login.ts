// const VERIFY_TOKEN_URL = 'auth/token/verify/';
// const REFRESH_TOKEN_URL = 'auth/token/refresh/';

import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { HttpError } from '@js-camp/core/models/httpError';
import { Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';
import { AxiosError } from 'axios';

import { appAxios } from '../../axios';

const LOGIN_URL = 'auth/login/';

/** Post user information to register.
 * @param userLoginInfo Registration info of user.
 */
export async function postUserLoginInfo(userLoginInfo: Login): Promise<Token | HttpError<null>> {
  try {
    const userLoginDto = LoginMapper.toDto(userLoginInfo);
    const response = await appAxios.post<TokenDto>(LOGIN_URL, { ...userLoginDto });
    return TokenMapper.fromDto(response.data);
  } catch (error: unknown) {
    const errorWithType = error as AxiosError<HttpErrorDto<null>>;
    if (errorWithType.response) {
      return HttpErrorMapper.fromDtoWithNull(errorWithType.response.data);
    }
    return new HttpError({ detail: 'Unknown error', data: null });
  }
}
