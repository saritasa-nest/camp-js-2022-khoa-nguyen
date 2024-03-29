import { AnimeListQueryOptions } from '@js-camp/core/models/animeListQueryOptions';
import { Sorting } from '@js-camp/core/models/sorting';

import { DEFAULT_ACTIVE_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_TOTAL_PAGE, SORT_OPTIONS } from '../constants';
import { OrderOption } from '../enum';
import { SearchParamsService } from '../service';

/** Get initial query params. */
export function getInitialQueryParams(): AnimeListQueryOptions {
  const searchParam = SearchParamsService.getSearchParams();
  return new AnimeListQueryOptions({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    activePage: searchParam.page != null ? searchParam.page : DEFAULT_ACTIVE_PAGE,
    totalPages: DEFAULT_TOTAL_PAGE,
    sorting: new Sorting({
      title: searchParam.sortBy != null ?
        SORT_OPTIONS.filter(item => searchParam.sortBy === item.value)[0].title :
        SORT_OPTIONS[0].title,
      value: searchParam.sortBy != null ? searchParam.sortBy : SORT_OPTIONS[0].value,
      isAscending: searchParam.ordering === OrderOption.Ascending || searchParam.ordering == null,
    }),
  });
}
