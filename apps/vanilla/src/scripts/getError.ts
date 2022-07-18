import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { HttpError } from '@js-camp/core/models/httpError';
import { AxiosError } from 'axios';

/**
 * Get axios errors.
 * @param error Error from axios.
 * @param mapperError Mapper function which return error model.
 */
export function getError<ErrorDto, Error>(error: unknown, mapperError: (error: ErrorDto) => Error): HttpError<Error | null> {
  const errorWithType = error as AxiosError<HttpErrorDto<ErrorDto>>;
  if (errorWithType.response !== null && errorWithType.response !== undefined) {
    return HttpErrorMapper.fromDto<ErrorDto, Error>(errorWithType.response.data, mapperError);
  }
  return new HttpError({ detail: 'Unknown error', data: null });
}

/**
 * Throw errors.
 * @param error Error catched.
 * @param message Message of error.
 */
export function throwError(error: unknown, message: string): void {
  if (error instanceof Error) {
    throw new Error(`${message} ${error.message}`);
  } else {
    throw new Error('Unexpected error!');
  }
}
