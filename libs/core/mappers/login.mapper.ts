import { LoginDto } from '../dtos/login.dto';
import { Login } from '../models/login';

export namespace LoginMapper {

  /**
   * Maps dto to model.
   * @param dto Password dto.
   */
  export function fromDto(dto: LoginDto): Login {
    return new Login({
      email: dto.email,
      password: dto.password,
    });
  }

  /**
   * Maps model to dto.
   * @param info User login info.
   */
  export function toDto(info: Login): LoginDto {
    return {
      email: info.email,
      password: info.password,
    };
  }
}
