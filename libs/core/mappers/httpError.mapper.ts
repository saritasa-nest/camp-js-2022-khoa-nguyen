import { HttpErrorDto } from '../dtos/httpError.dto';
import { HttpError } from '../models/httpError';

export namespace HttpErrorMapper {

  /**
   * Maps model to dto.
   * @param dto Genre dto.
   * @param resultFromDto Genre dto.
   */
  export function fromDto<Dto, Model>(dto: HttpErrorDto<Dto>, resultFromDto: (resultDto: Dto) => Model): HttpError<Model> {
    return new HttpError({
      data: resultFromDto(dto.data),
      detail: dto.detail,
    });
  }

  /**
   * Maps model to dto.
   * @param dto Something.
   */
  export function fromDtoWithNull(dto: HttpErrorDto<null>): HttpError<null> {
    return new HttpError({
      data: null,
      detail: dto.detail,
    });
  }
}
