import { HttpErrorDto } from '../dtos/httpError.dto';
import { HttpError } from '../models/httpError';

import { DataErrorMapper } from './dataError.mapper';

export namespace HttpErrorMapper {

  /**
   * Maps model to dto.
   * @param dto Genre dto.
   */
  export function fromDto(dto: HttpErrorDto<T>): HttpError {
    return new HttpError({
      data: DataErrorMapper.fromDto(dto.data),
      detail: dto.detail,
    });
  }
}
