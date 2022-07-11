import { TokenDto } from '../dtos/token.dto';
import { Token } from '../models/token';

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
}
