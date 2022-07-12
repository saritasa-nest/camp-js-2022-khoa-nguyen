// const VERIFY_TOKEN_URL = 'auth/token/verify/';
// const REFRESH_TOKEN_URL = 'auth/token/refresh/';

import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { ErrorLoginDto } from '@js-camp/core/dtos/login.dto';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { ErrorLoginMapper, LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { HttpError } from '@js-camp/core/models/httpError';
import { ErrorLogin, Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';
import { AxiosError } from 'axios';

import { appAxios } from '../../axios';

const LOGIN_URL = 'auth/login/';

/** Post user information to register.
 * @param userLoginInfo Registration info of user.
 */
export async function postUserLoginInfo(userLoginInfo: Login): Promise<Token | HttpError<ErrorLogin>> {
  try {
    const userLoginDto = LoginMapper.toDto(userLoginInfo);
    const response = await appAxios.post<TokenDto>(LOGIN_URL, { ...userLoginDto });
    return TokenMapper.fromDto(response.data);
  } catch (error: unknown) {
    const errorWithType = error as AxiosError<HttpErrorDto<ErrorLoginDto>>;
    if (errorWithType.response) {
      return HttpErrorMapper.fromDto<ErrorLoginDto, ErrorLogin>(errorWithType.response.data, ErrorLoginMapper.fromDto);
    }
    return new HttpError({ detail: 'Unknown error' });
  }
}
