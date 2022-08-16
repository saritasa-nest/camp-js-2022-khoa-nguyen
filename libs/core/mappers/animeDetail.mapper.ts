import { StatusDto } from '../dtos/anime.dto';
import { AnimeDetailDto, SeasonDto } from '../dtos/animeDetail.dto';
import { StatusModel, TypeModel } from '../models';
import { AnimeDetail, Season } from '../models/animeDetail';

import { AnimeMapper } from './anime.mapper';
import { AnimeListQueryOptionsMapper } from './animeListQueryOptions.mapper';

import { DateRangeMapper } from './dateRange.mapper';
import { GenreMapper } from './genre.mapper';

import { StudioMapper } from './studio.mapper';

export namespace AnimeDetailMapper {

  const seasonDtoToModal: Readonly<Record<SeasonDto, Season>> = {
    [SeasonDto.Fall]: Season.Fall,
    [SeasonDto.NonSeasonal]: Season.NonSeasonal,
    [SeasonDto.Spring]: Season.Spring,
    [SeasonDto.Summer]: Season.Summer,
    [SeasonDto.Winter]: Season.Winter,
  };

  const seasonModelToDto: Readonly<Record<Season, SeasonDto>> = {
    [Season.Fall]: SeasonDto.Fall,
    [Season.NonSeasonal]: SeasonDto.NonSeasonal,
    [Season.Spring]: SeasonDto.Spring,
    [Season.Summer]: SeasonDto.Summer,
    [Season.Winter]: SeasonDto.Winter,
  };

  const statusModelToDto: Readonly<Record<StatusModel, StatusDto>> = {
    [StatusModel.Airing]: StatusDto.Airing,
    [StatusModel.NotAired]: StatusDto.NotAired,
    [StatusModel.Finished]: StatusDto.Finished,
    [StatusModel.Default]: StatusDto.Default,
  };

  /**
   * Maps dto to model.
   * @param dto Anime detail dto.
   */
  export function fromDto(dto: AnimeDetailDto): AnimeDetail {
    const season = seasonDtoToModal[dto.season];
    return new AnimeDetail({
      ...AnimeMapper.fromDto(dto),
      trailerYoutubeId: dto.trailer_youtube_id,
      isAiring: dto.airing,
      synopsis: dto.synopsis,
      studioIds: dto.studios,
      studios: dto.studios_data != null ? dto.studios_data.map(item => StudioMapper.fromDto(item)) : [],
      genresIds: dto.genres,
      genres: dto.genres_data != null ? dto.genres_data.map(item => GenreMapper.fromDto(item)) : [],
      season,
    });
  }

  /**
   * Maps dto to model.
   * @param model Anime detail model.
   */
  export function toDto(model: AnimeDetail): AnimeDetailDto {
    const type = AnimeListQueryOptionsMapper.typeModelToDto[model.type] ?? TypeModel.Default;
    const status = statusModelToDto[model.status] ?? StatusModel.Default;
    return {
      id: model.id,
      image: model.image,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      trailer_youtube_id: model.trailerYoutubeId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      title_eng: model.titleEnglish,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      title_jpn: model.titleJapan,
      type,
      status,
      airing: model.isAiring,
      aired: DateRangeMapper.toDto(model.aired),
      season: seasonModelToDto[model.season],
      synopsis: model.synopsis,
      studios: model.studioIds,
      genres: model.genresIds,
      modified: new Date().toISOString()
        .split('T')[0],
    };
  }
}
