import { DataErrorDto } from '../dtos/dataError.dto';
import { DataError } from '../models/dataError';

export namespace DataErrorMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: DataErrorDto): DataError {
    return new DataError({
      firstName: dto.first_name,
      email: dto.email,
      lastName: dto.last_name,
      password: dto.password,
      avatar: dto.avatar,
    });
  }
}
