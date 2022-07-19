import { AnimeDetailDto } from '../dtos/animeDetail.dto';
import { StatusDto, TypeDto } from '../enum';
import { AnimeDetail } from '../models/animeDetail';

import { DateRangeMapper } from './dateRange.mapper';
import { GenreMapper } from './genre.mapper';
import { statusDtoToModel, typeDtoToModel } from './record.mapper';

import { StudioMapper } from './studio.mapper';

export namespace AnimeDetailMapper {

  /**
   * Maps dto to model.
   * @param dto Anime detail dto.
   */
  export function fromDto(dto: AnimeDetailDto): AnimeDetail {
    const type = typeDtoToModel[dto.type] ?? TypeDto.Default;
    const status = statusDtoToModel[dto.status] ?? StatusDto.Default;
    return new AnimeDetail({
      trailerYoutubeId: dto.trailer_youtube_id,
      airing: dto.airing,
      synopsis: dto.synopsis,
      studios: dto.studios,
      studiosData: dto.studios_data != null ? dto.studios_data.map(item => StudioMapper.fromDto(item)) : [],
      genres: dto.genres,
      genresData: dto.genres != null ? dto.genres_data.map(item => GenreMapper.fromDto(item)) : [],
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
