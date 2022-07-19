import { GenreDto } from '../dtos/genre.dto';
import { Genre } from '../models/genre';

import { genresTypeDtoToModel } from './record.mapper';

export namespace GenreMapper {

  /**
   * Maps dto to model.
   * @param dto Genres type dto.
   */
  export function fromDto(dto: GenreDto): Genre {
    const type = genresTypeDtoToModel[dto.type];
    return new Genre({
      id: dto.id,
      name: dto.name,
      created: dto.created,
      modified: dto.modified,
      type,
    });
  }
}
