import { ErrorTokenDto, TokenDto } from '@js-camp/core/dtos/token.dto';
import { ErrorTokenMapper, TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { HttpError } from '@js-camp/core/models/httpError';
import { ErrorToken, Token } from '@js-camp/core/models/token';

import { appAxios } from '../../configs';
import { REFRESH_TOKEN_API, VERIFY_TOKEN_API } from '../../constants';
import { getError } from '../../utils';

/**
 * Verify token.
 * @param token Token to verify.
 */
export async function verifyToken(token: Token): Promise<Token | HttpError<ErrorToken | null>> {
  try {
    const tokenDto = TokenMapper.toDto(token);
    const response = await appAxios.post<TokenDto>(VERIFY_TOKEN_API, { token: tokenDto.access });
    return TokenMapper.fromDto(response.data);
  } catch (error: unknown) {
    return getError<ErrorTokenDto, ErrorToken>(error, ErrorTokenMapper.fromDto);
  }
}

/**
 * Refresh token.
 * @param token Token to refresh.
 */
export async function refreshToken(token: Token): Promise<Token | HttpError<ErrorToken | null>> {
  try {
    const tokenDto = TokenMapper.toDto(token);
    const response = await appAxios.post<TokenDto>(REFRESH_TOKEN_API, { refresh: tokenDto.refresh });
    return TokenMapper.fromDto(response.data);
  } catch (error: unknown) {
    return getError<ErrorTokenDto, ErrorToken>(error, ErrorTokenMapper.fromDto);
  }
}
