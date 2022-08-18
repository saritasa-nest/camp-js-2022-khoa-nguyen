import { Injectable } from '@angular/core';
import { TypeDto } from '@js-camp/core/dtos';
import { AnimeListQueryOptions, Sorting, SortTitle, SortValue } from '@js-camp/core/models';

import { DEFAULT_LIMIT, DEFAULT_ANIME_LIST_QUERY, SORT_OPTIONS, OrderOption, DEFAULT_SEARCH } from '../../constants';

import { QueryUrl, SettingOfAnimeList } from './anime.service';

/** Mapper service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeMapper {
  /**
   * Map url param to model.
   * @param params Query url.
   */
  public urlParamToModel(params: QueryUrl): AnimeListQueryOptions {
    const activePage = params.page ?? 1;
    const limit = params.limit ?? DEFAULT_LIMIT;
    return new AnimeListQueryOptions({
      ...DEFAULT_ANIME_LIST_QUERY,
      limit,
      activePage,
      offset: (activePage - 1) * limit,
      multipleType: params.type ?? TypeDto.Default,
      sorting: new Sorting({
        title: params.sortBy != null ?
          SORT_OPTIONS.filter(item => item.value === params.sortBy)[0].title :
          SortTitle.TitleEnglish,
        value: params.sortBy ?? SortValue.TitleEnglish,
        isAscending: params.ordering != null ? params.ordering === OrderOption.Ascending : true,
      }),
      search: params.search ?? DEFAULT_SEARCH,
    });
  }

  /**
   * Map model param to model.
   * @param params Query url.
   */
  public modelToSetting(params: AnimeListQueryOptions): SettingOfAnimeList {
    return {
      limit: params.limit,
      page: params.activePage,
      sortBy: params.sorting.value,
      ordering: params.sorting.isAscending ?
        OrderOption.Ascending :
        OrderOption.Descending,
      search: params.search,
      type: params.multipleType == null ?
        [TypeDto.Default] :
        params.multipleType
          .split(',')
          .map(item => item as TypeDto),
    };
  }

  /**
   * Settings to model.
   * @param settings Settings of Anime list.
   */
  public settingToModel(settings: SettingOfAnimeList): AnimeListQueryOptions {
    const activePage = settings.page ?? 1;
    const limit = settings.limit ?? DEFAULT_LIMIT;
    return new AnimeListQueryOptions({
      ...DEFAULT_ANIME_LIST_QUERY,
      limit,
      activePage,
      offset: (activePage - 1) * limit,
      multipleType: settings.type?.join(','),
      sorting: new Sorting({
        title: settings.sortBy != null ?
          SORT_OPTIONS.filter(item => item.value === settings.sortBy)[0].title :
          SortTitle.TitleEnglish,
        value: settings.sortBy ?? SortValue.TitleEnglish,
        isAscending: settings.ordering != null ? settings.ordering === OrderOption.Ascending : true,
      }),
      search: settings.search ?? DEFAULT_SEARCH,
    });
  }

  /**
   * Settings to Url.
   * @param settings Settings of Anime list.
   */
  public settingToUrl(settings: SettingOfAnimeList): QueryUrl {
    return {
      limit: settings.limit,
      page: settings.page,
      sortBy: settings.sortBy,
      ordering: settings.ordering,
      search: settings.search ? settings.search : DEFAULT_SEARCH,
      type: settings.type ? settings.type.join(',') : TypeDto.Default,
    };
  }

  /**
   * Url to settings.
   * @param params Params url.
   */
  public urlToSetting(params: QueryUrl): SettingOfAnimeList {
    return {
      limit: params.limit,
      page: params.page,
      sortBy: params.sortBy,
      ordering: params.ordering,
      search: params.search ? params.search : DEFAULT_SEARCH,
      type: params.type ? params.type.split(',').map(item => item as TypeDto) : [TypeDto.Default],
    };
  }
}
