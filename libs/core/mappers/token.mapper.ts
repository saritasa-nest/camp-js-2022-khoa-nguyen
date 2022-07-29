import { ErrorTokenDto, TokenDto } from '../dtos/token.dto';
import { ErrorToken, Token } from '../models/token';

export namespace TokenMapper {

  /**
   * Maps dto to model.
   * @param dto Token dto.
   */
  export function fromDto(dto: TokenDto): Token {
    return new Token({
      access: dto.access,
      refresh: dto.refresh,
    });
  }

  /**
   * Maps model to dto.
   * @param token Token model.
   */
  export function toDto(token: Token): TokenDto {
    return {
      access: token.access,
      refresh: token.refresh,
    };
  }
}

export namespace ErrorTokenMapper {

  /**
   * Maps dto to model.
   * @param dto Token dto.
   */
  export function fromDto(dto: ErrorTokenDto): ErrorToken {
    return new ErrorToken({
      token: dto.token,
      noneFieldErrors: dto.non_field_errors,
    });
  }
}
