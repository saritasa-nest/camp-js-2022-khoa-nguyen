import { AnimeDto, StatusDto, TypeDto } from '../dtos/anime.dto';
import { Anime, StatusModel, TypeModel } from '../models/anime';

import { DateRangeMapper } from './dateRange.mapper';

export namespace AnimeMapper {
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

  export const statusModelToDto: Readonly<Record<StatusModel, StatusDto>> = {
    [StatusModel.Airing]: StatusDto.Airing,
    [StatusModel.NotAired]: StatusDto.NotAired,
    [StatusModel.Finished]: StatusDto.Finished,
    [StatusModel.Default]: StatusDto.Default,
  };

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    const type = typeDtoToModel[dto.type] ?? TypeDto.Default;
    const status = statusDtoToModel[dto.status] ?? StatusDto.Default;
    return new Anime({
      id: dto.id,
      titleEnglish: dto.title_eng,
      titleJapan: dto.title_jpn,
      image: dto.image,
      aired: DateRangeMapper.fromDto({ ...dto.aired }),
      type,
      status,
    });
  }
}
