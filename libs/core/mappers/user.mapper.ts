import { ErrorUserDto, UserDto } from '../dtos/user.dto';
import { ErrorUser, User } from '../models/user';

export namespace UserMapper {

  /**
   * Maps dto to model.
   * @param dto User dto.
   */
  export function fromDto(dto: UserDto): User {
    return new User({
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
      password: dto.password,
      avatar: dto.avatar,
    });
  }

  /**
   * Maps user info to dto.
   * @param info User info.
   */
  export function toDto(info: User): UserDto {
    return {
      email: info.email,
      first_name: info.firstName,
      last_name: info.lastName,
      password: info.password,
      avatar: info.avatar,
    };
  }
}

export namespace ErrorUserMapper {

  /**
   * Maps dto to model.
   * @param dto Error sign up info dto.
   */
  export function fromDto(dto: ErrorUserDto): ErrorUser {
    return new ErrorUser({
      firstName: dto.first_name,
      email: dto.email,
      lastName: dto.last_name,
      password: dto.password,
      avatar: dto.avatar,
    });
  }
}
