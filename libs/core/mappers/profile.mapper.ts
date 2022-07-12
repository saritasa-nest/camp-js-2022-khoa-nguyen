import { ProfileDto } from '../dtos/profile.dto';
import { Profile } from '../models/profile';

export namespace ProfileMapper {

  /**
   * Maps dto to model.
   * @param dto Profile dto.
   */
  export function fromDto(dto: ProfileDto): Profile {
    return new Profile({
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
      avatar: dto.avatar,
      created: dto.created,
      modified: dto.modified,
    });
  }
}
