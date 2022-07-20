import { GenresTypeDTO, GenresTypeModel } from '../enum/genresType';

export const genresTypeDtoToModel: Readonly<Record<GenresTypeDTO, GenresTypeModel>> = {
  [GenresTypeDTO.Genres]: GenresTypeModel.Genres,
  [GenresTypeDTO.Demographics]: GenresTypeModel.Demographics,
  [GenresTypeDTO.ExplicitGenres]: GenresTypeModel.ExplicitGenres,
  [GenresTypeDTO.Themes]: GenresTypeModel.Themes,
};
