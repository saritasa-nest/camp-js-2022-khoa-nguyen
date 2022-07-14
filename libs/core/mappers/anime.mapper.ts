import { AnimeDto } from '../dtos/anime.dto';
import { Status, Type } from '../enum';
import { Anime } from '../models/anime';

import { DateRangeMapper } from './dateRange.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    const { status, type } = dto;

    /**
     * Checks if the value is a status.
     * @param value Value, possibly being a status.
     */
    function isCorrectStatus(value: keyof Status | string): value is Status {
      return Object.keys(Status).includes(value as Status);
    }

    /**
     * Checks if the value is a type.
     * @param value Value, possibly being a type.
     */
    function isCorrectType(value: keyof Type | string): value is Type {
      return Object.keys(Type).includes(value as Type);
    }

    /**
     * Get status of anime.
     */
    function getStatusAnime(): Status {
      if (!isCorrectStatus(status)) {
        return Status.UNDEFINED;
      }
      return Status[status];
    }

    /**
     * Get type of anime.
     */
    function getTypeAnime(): Type {
      if (!isCorrectType(type)) {
        return Type.UNDEFINED;
      }
      return Type[type];
    }

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
