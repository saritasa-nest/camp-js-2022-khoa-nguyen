import { StatusDto, TypeDto } from '../dtos/anime.dto';
import { AnimeDetailDto } from '../dtos/animeDetail.dto';
import { AnimeDetail } from '../models/animeDetail';

import { AnimeMapper } from './anime.mapper';

import { DateRangeMapper } from './dateRange.mapper';
import { GenreMapper } from './genre.mapper';

import { StudioMapper } from './studio.mapper';

export namespace AnimeDetailMapper {

  /**
   * Maps dto to model.
   * @param dto Anime detail dto.
   */
  export function fromDto(dto: AnimeDetailDto): AnimeDetail {
    const type = AnimeMapper.typeDtoToModel[dto.type] ?? TypeDto.Default;
    const status = AnimeMapper.statusDtoToModel[dto.status] ?? StatusDto.Default;
    return new AnimeDetail({
      trailerYoutubeId: dto.trailer_youtube_id,
      isAiring: dto.airing,
      synopsis: dto.synopsis,
      studioIds: dto.studios,
      studios: dto.studios_data != null ? dto.studios_data.map(item => StudioMapper.fromDto(item)) : [],
      genresIds: dto.genres,
      genres: dto.genres_data != null ? dto.genres_data.map(item => GenreMapper.fromDto(item)) : [],
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
