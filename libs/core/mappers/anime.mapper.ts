import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { DateRangeMapper } from './dateRange.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      id: dto.id,
      titleEnglish: dto.title_eng,
      titleJapan: dto.title_jpn,
      image: dto.image,
      aired: DateRangeMapper.fromDto({ start: dto.aired.start, end: dto.aired.end }),
      type: getTypeAnime(),
      status: getStatusAnime(),
    });
  }
}
