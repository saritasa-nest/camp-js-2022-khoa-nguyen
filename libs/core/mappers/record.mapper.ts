import { StatusDto, StatusModel, TypeDto, TypeModel } from '../enum';
import { GenresTypeDTO, GenresTypeModel } from '../enum/genresType';

export const typeDtoToModel: Readonly<Record<TypeDto, TypeModel>> = {
  [TypeDto.Movie]: TypeModel.Movie,
  [TypeDto.Ona]: TypeModel.Ona,
  [TypeDto.Ova]: TypeModel.Ova,
  [TypeDto.Special]: TypeModel.Special,
  [TypeDto.Music]: TypeModel.Music,
  [TypeDto.Tv]: TypeModel.Tv,
  [TypeDto.Default]: TypeModel.Default,
};

export const statusDtoToModel: Readonly<Record<StatusDto, StatusModel>> = {
  [StatusDto.Airing]: StatusModel.Airing,
  [StatusDto.NotAired]: StatusModel.NotAired,
  [StatusDto.Finished]: StatusModel.Finished,
  [StatusDto.Default]: StatusModel.Default,
};
export const genresTypeDtoToModel: Readonly<Record<GenresTypeDTO, GenresTypeModel>> = {
  [GenresTypeDTO.Genres]: GenresTypeModel.Genres,
  [GenresTypeDTO.Demographics]: GenresTypeModel.Demographics,
  [GenresTypeDTO.ExplicitGenres]: GenresTypeModel.ExplicitGenres,
  [GenresTypeDTO.Themes]: GenresTypeModel.Themes,
};
