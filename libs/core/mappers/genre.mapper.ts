import { GenreDto, GenresTypeDTO } from '../dtos/genre.dto';
import { Genre, GenresTypeModel } from '../models/genre';

export namespace GenreMapper {

  export const genresTypeDtoToModel: Readonly<Record<GenresTypeDTO, GenresTypeModel>> = {
    [GenresTypeDTO.Genres]: GenresTypeModel.Genres,
    [GenresTypeDTO.Demographics]: GenresTypeModel.Demographics,
    [GenresTypeDTO.ExplicitGenres]: GenresTypeModel.ExplicitGenres,
    [GenresTypeDTO.Themes]: GenresTypeModel.Themes,
  };

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
