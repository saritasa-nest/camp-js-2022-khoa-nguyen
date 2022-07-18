import { AnimeDto } from '../dtos/anime.dto';
import { StatusDto, StatusModel, TypeDto, TypeModel } from '../enum';
import { Anime } from '../models/anime';

import { DateRangeMapper } from './dateRange.mapper';

export namespace AnimeMapper {

  const typeDtoToModel: Readonly<Record<TypeDto, TypeModel>> = {
    [TypeDto.MOVIE]: TypeModel.Movie,
    [TypeDto.ONA]: TypeModel.Ona,
    [TypeDto.OVA]: TypeModel.Ova,
    [TypeDto.SPECIAL]: TypeModel.Special,
    [TypeDto.MUSIC]: TypeModel.Music,
    [TypeDto.TV]: TypeModel.Tv,
    [TypeDto.DEFAULT]: TypeModel.Default,
  };

  const statusDtoToModel: Readonly<Record<StatusDto, StatusModel>> = {
    [StatusDto.AIRING]: StatusModel.Airing,
    [StatusDto.NOT_YET_AIRED]: StatusModel.NotAired,
    [StatusDto.FINISHED]: StatusModel.Finished,
    [StatusDto.DEFAULT]: StatusModel.Default,
  };

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    const type = typeDtoToModel[dto.type] ?? TypeDto.DEFAULT;
    const status = statusDtoToModel[dto.status] ?? StatusDto.DEFAULT;
    return new Anime({
      id: dto.id,
      titleEnglish: dto.title_eng,
      titleJapan: dto.title_jpn,
      image: dto.image,
      aired: DateRangeMapper.fromDto({ start: dto.aired.start, end: dto.aired.end }),
      type,
      status,
    });
  }
}
