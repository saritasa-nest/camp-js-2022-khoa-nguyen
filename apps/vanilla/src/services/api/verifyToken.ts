import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { ErrorTokenDto, TokenDto } from '@js-camp/core/dtos/token.dto';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { ErrorTokenMapper, TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { HttpError } from '@js-camp/core/models/httpError';
import { ErrorToken, Token } from '@js-camp/core/models/token';
import { AxiosError } from 'axios';

import { appAxios } from '../../axios';

const VERIFY_TOKEN_URL = '/auth/token/verify/';

/** Post token to verify.
 * @param token Token of verify.
 */
export async function postTokenToVerify(token: Token): Promise<Token | HttpError<ErrorToken | null>> {
  try {
    const tokenDto = TokenMapper.toDto(token);
    const response = await appAxios.post<TokenDto>(VERIFY_TOKEN_URL, { token: tokenDto.access });
    return TokenMapper.fromDto(response.data);
  } catch (error: unknown) {
    const errorWithType = error as AxiosError<HttpErrorDto<ErrorTokenDto>>;
    if (errorWithType.response) {
      return HttpErrorMapper.fromDto<ErrorTokenDto, ErrorToken>(errorWithType.response.data, ErrorTokenMapper.fromDto);
    }
    return new HttpError({ detail: 'Unknown error', data: null });
  }
}

/** Post token to refresh.
 * @param token Token to refresh.
 */
export async function postRefreshToken(token: Token): Promise<Token | HttpError<ErrorToken | null>> {
  try {
    const tokenDto = TokenMapper.toDto(token);
    const response = await appAxios.post<TokenDto>(VERIFY_TOKEN_URL, { refresh: tokenDto.refresh });
    return TokenMapper.fromDto(response.data);
  } catch (error: unknown) {
    const errorWithType = error as AxiosError<HttpErrorDto<ErrorTokenDto>>;
    if (errorWithType.response) {
      return HttpErrorMapper.fromDto<ErrorTokenDto, ErrorToken>(errorWithType.response.data, ErrorTokenMapper.fromDto);
    }
    return new HttpError({ detail: 'Unknown error', data: null });
  }
}
