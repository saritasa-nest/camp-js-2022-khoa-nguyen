import { AnimeDto } from '../dtos/anime.dto';
import { StatusDto, TypeDto } from '../enum';
import { Anime } from '../models/anime';

import { DateRangeMapper } from './dateRange.mapper';
import { statusDtoToModel, typeDtoToModel } from './record.mapper';

export namespace AnimeMapper {

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
