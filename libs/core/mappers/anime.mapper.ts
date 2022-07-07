import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      id: dto.id,
      titleEng: dto.title_eng,
      titleJapan: dto.title_jpn,
      image: dto.image,
      airedStart: dto.aired.start !== null ? new Date(dto.aired.start) : null,
      type: dto.type,
      status: dto.status,
    });
  }
}
