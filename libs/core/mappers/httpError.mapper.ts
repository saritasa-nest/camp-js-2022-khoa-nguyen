import { HttpErrorDto } from '../dtos/httpError.dto';
import { HttpError } from '../models/httpError';

export namespace HttpErrorMapper {

  /**
   * Maps model to dto.
   * @param dto HttpError dto.
   * @param mapDataFromDtoToModel Callback to map dto into model.
   */
  export function fromDto<Dto, Model>(dto: HttpErrorDto<Dto>, mapDataFromDtoToModel: (data: Dto) => Model): HttpError<Model> {
    return new HttpError({
      data: dto.data && mapDataFromDtoToModel(dto.data),
      detail: dto.detail,
      code: dto.code,
    });
  }

  /**
   * Maps model to dto but required no type in generic type.
   * @param dto .
   */
  export function fromDtoWithNull(dto: HttpErrorDto<null>): HttpError<null> {
    return new HttpError({
      data: null,
      detail: dto.detail,
    });
  }
}
