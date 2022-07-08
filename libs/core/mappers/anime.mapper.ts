import { AnimeDto } from '../dtos/anime.dto';
import { Anime, DateRange } from '../models/anime';

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
      aired: new DateRange({
        start: dto.aired.start !== null ? new Date(dto.aired.start) : null,
        end: dto.aired.end !== null ? new Date(dto.aired.end) : null,
      }),
      type: dto.type,
      status: dto.status,
    });
  }
}
