import { ErrorLoginDto, LoginDto } from '../dtos/login.dto';
import { ErrorLogin, Login } from '../models/login';

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

export namespace ErrorLoginMapper {

  /**
   * Maps dto to model.
   * @param dto Password dto.
   */
  export function fromDto(dto: ErrorLoginDto): ErrorLogin {
    return new ErrorLogin({
      noneFieldErrors: dto.non_field_errors ? null : dto.non_field_errors,
    });
  }
}
