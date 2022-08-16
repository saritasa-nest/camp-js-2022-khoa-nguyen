import { StatusDto } from '../dtos';
import { AnimeEditDto, RatingDto, SeasonDto, SourceDto } from '../dtos/animeEdit.dto';
import { TypeModel } from '../models';
import { AnimeEdit, Rating, Season, Source } from '../models/animeEdit';

import { AnimeMapper } from './anime.mapper';
import { AnimeDetailMapper } from './animeDetail.mapper';

import { AnimeListQueryOptionsMapper } from './animeListQueryOptions.mapper';

import { DateRangeMapper } from './dateRange.mapper';

export namespace AnimeEditMapper {

  export const seasonDtoToModal: Readonly<Record<SeasonDto, Season>> = {
    [SeasonDto.Fall]: Season.Fall,
    [SeasonDto.NonSeasonal]: Season.NonSeasonal,
    [SeasonDto.Spring]: Season.Spring,
    [SeasonDto.Summer]: Season.Summer,
    [SeasonDto.Winter]: Season.Winter,
  };

  export const seasonModelToDto: Readonly<Record<Season, SeasonDto>> = {
    [Season.Fall]: SeasonDto.Fall,
    [Season.NonSeasonal]: SeasonDto.NonSeasonal,
    [Season.Spring]: SeasonDto.Spring,
    [Season.Summer]: SeasonDto.Summer,
    [Season.Winter]: SeasonDto.Winter,
  };

  export const sourceModelToDto: Readonly<Record<Source, SourceDto>> = {
    [Source.Book]: SourceDto.Book,
    [Source.CardGame]: SourceDto.CardGame,
    [Source.FourKomaManga]: SourceDto.FourKomaManga,
    [Source.Game]: SourceDto.Game,
    [Source.LightNovel]: SourceDto.LightNovel,
    [Source.Manga]: SourceDto.Manga,
    [Source.MixedMedia]: SourceDto.MixedMedia,
    [Source.Music]: SourceDto.Music,
    [Source.Novel]: SourceDto.Novel,
    [Source.Original]: SourceDto.Original,
    [Source.Other]: SourceDto.Other,
    [Source.PictureBook]: SourceDto.PictureBook,
    [Source.Radio]: SourceDto.Radio,
    [Source.Unknown]: SourceDto.Unknown,
    [Source.VisualNovel]: SourceDto.VisualNovel,
    [Source.WebManga]: SourceDto.WebManga,
    [Source.WebNovel]: SourceDto.WebNovel,
  };

  export const sourceDtoToModel: Readonly<Record<SourceDto, Source>> = {
    [SourceDto.Book]: Source.Book,
    [SourceDto.CardGame]: Source.CardGame,
    [SourceDto.FourKomaManga]: Source.FourKomaManga,
    [SourceDto.Game]: Source.Game,
    [SourceDto.LightNovel]: Source.LightNovel,
    [SourceDto.Manga]: Source.Manga,
    [SourceDto.MixedMedia]: Source.MixedMedia,
    [SourceDto.Music]: Source.Music,
    [SourceDto.Novel]: Source.Novel,
    [SourceDto.Original]: Source.Original,
    [SourceDto.Other]: Source.Other,
    [SourceDto.PictureBook]: Source.PictureBook,
    [SourceDto.Radio]: Source.Radio,
    [SourceDto.Unknown]: Source.Unknown,
    [SourceDto.VisualNovel]: Source.VisualNovel,
    [SourceDto.WebManga]: Source.WebManga,
    [SourceDto.WebNovel]: Source.WebNovel,
  };

  export const ratingModelToDto: Readonly<Record<Rating, RatingDto>> = {
    [Rating.GeneralAudiences]: RatingDto.GeneralAudiences,
    [Rating.ParentalGuidance]: RatingDto.ParentalGuidance,
    [Rating.ParentsStrongly]: RatingDto.ParentsStrongly,
    [Rating.Restricted]: RatingDto.Restricted,
    [Rating.RestrictedPlus]: RatingDto.RestrictedPlus,
    [Rating.RestrictedX]: RatingDto.RestrictedX,
    [Rating.Unknown]: RatingDto.Unknown,
  };

  export const ratingDtoToModel: Readonly<Record<RatingDto, Rating>> = {
    [RatingDto.GeneralAudiences]: Rating.GeneralAudiences,
    [RatingDto.ParentalGuidance]: Rating.ParentalGuidance,
    [RatingDto.ParentsStrongly]: Rating.ParentsStrongly,
    [RatingDto.Restricted]: Rating.Restricted,
    [RatingDto.RestrictedPlus]: Rating.RestrictedPlus,
    [RatingDto.RestrictedX]: Rating.RestrictedX,
    [RatingDto.Unknown]: Rating.Unknown,
  };

  /**
   * Maps model to dto.
   * @param model Anime edit model.
   */
  export function toDto(model: AnimeEdit): Omit<AnimeEditDto, 'studios_data' | 'genres_data'> {
    const type = AnimeListQueryOptionsMapper.typeModelToDto[model.type] ?? TypeModel.Default;
    const status = AnimeMapper.statusModelToDto[model.status] ?? StatusDto.Default;
    const source = sourceModelToDto[model.source];
    const rating = ratingModelToDto[model.rating];
    const season = seasonModelToDto[model.season];

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
      season,
      synopsis: model.synopsis,
      studios: model.studioIds,
      genres: model.genresIds,
      modified: new Date().toISOString()
        .split('T')[0],
      source,
      rating,
    };
  }

  /**
   * Maps dto to model.
   * @param dto Anime edit dto.
   */
  export function fromDto(dto: AnimeEditDto): AnimeEdit {
    const source = sourceDtoToModel[dto.source];
    const rating = ratingDtoToModel[dto.rating];
    const season = seasonDtoToModal[dto.season];

    return new AnimeEdit({
      ...AnimeDetailMapper.fromDto(dto),
      season,
      source,
      rating,
    });

  }
}
