import { Genre, StatusModel, Studio, TypeModel } from '@js-camp/core/models';
import { AnimeEdit, Rating, Season, Source } from '@js-camp/core/models/animeEdit';
import { DateRange } from '@js-camp/core/models/dateRange';

import { isFieldsDefined } from '../../../../guards';

import { AnimeFormValidation } from './formSetting';

export namespace AnimeFormMapper {

  /**
   * Map from form value to model.
   * @param value Form value.
   */
  export function fromFormValue(value: AnimeFormValidation): AnimeEdit {
    if (!isFieldsDefined(value)) {
      throw new Error('Invalid anime form value.');
    }
    return new AnimeEdit({
      ...value,
      image: value.image === '' ? null : value.image,
      trailerYoutubeId:
        value.trailerYoutubeId === '' ? null : value.trailerYoutubeId,
      id: -1,
      type: value.type as TypeModel,
      source: value.source as Source,
      rating: value.rating as Rating,
      status: value.status as StatusModel,
      season: value.season as Season,
      isAiring: value.isAiring as boolean,
      aired: new DateRange({
        start: value.startDate as Date,
        end: value.endDate as Date,
      }),
      studioIds: value.studios.map(item => item.id),
      genresIds: value.genres.map(item => item.id),
    });
  }

  /**
   * Map from anime model to form values.
   * @param anime Current anime info.
   * @param genres List initial genres.
   * @param studios List initial studios.
   */
  export function toAnimeFormValues(
    anime: AnimeEdit,
    genres: Genre[],
    studios: Studio[],
  ): AnimeFormValidation {
    return {
      image: anime.image ?? null,
      trailerYoutubeId: anime.trailerYoutubeId ?? '',
      titleEnglish: anime.titleEnglish,
      titleJapan: anime.titleJapan,
      type: anime.type,
      status: anime.status ?? '',
      source: anime.source ?? '',
      isAiring: anime.isAiring,
      startDate: anime.aired.start ? anime.aired.start : null,
      endDate: anime.aired.end ? anime.aired.end : null,
      rating: anime.rating ?? '',
      season: anime.season ?? '',
      synopsis: anime.synopsis,
      studios:
      (anime?.studioIds.map(item =>
        studios.find(studio => studio.id === item)) as Studio[]) ?? [],
      genres:
      (anime?.genresIds.map(item =>
        genres.find(genre => genre.id === item)) as Genre[]) ?? [],
    };
  }

}
