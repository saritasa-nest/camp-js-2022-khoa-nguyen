
import { TypeDto } from '@js-camp/core/dtos/anime.dto';
import { SortValue } from '@js-camp/core/models/sorting';

import { HOME_URL } from '../../constants';
import { OrderOption } from '../../enum';
import { getInitialQueryParams } from '../../scripts/initAnimeTable';

/** Search param interface. */
interface SearchParam {

  /** Active page. */
  page: number | null;

  /** Search value. */
  search: string | null;

  /** Ordering. */
  ordering: string | null;

  /** Sort by. */
  sortBy: SortValue | null;

  /** Filter by type. */
  type: TypeDto | null;
}

export namespace SearchParamsService {

  /** Transform anime list query options to url search param. */
  export function animeListQueryOptionsToSearchParam(): URLSearchParams {
    const options = getInitialQueryParams();
    const searchParam = {
      page: options.activePage.toString(),
      search: options.search,
      ordering: options.sorting.isAscending ? OrderOption.Ascending : OrderOption.Descending,
      sortBy: options.sorting.value,
      type: options.type,
    };
    const params = new URLSearchParams(searchParam);
    return params;
  }

  /**
   * Transform anime list query options to url search param.
   * @param key URL search params.
   * @param value URL search params.
   */
  export function setSearchParamToUrl(key: string, value: string): void {
    const params = new URLSearchParams(window.location.search);
    if (value === '') {
      params.delete(key);
      window.history.pushState({}, HOME_URL, `?${params.toString()}`);
      return;
    }
    params.set(key, value);
    window.history.pushState({}, HOME_URL, `?${params.toString()}`);
  }

  /** Transform anime list query options to url search param.*/
  export function getSearchParams(): SearchParam {
    const params = new URLSearchParams(window.location.search);
    return {
      page: params.get('page') != null ? Number(params.get('page')) : null,
      search: params.get('search'),
      ordering: params.get('ordering'),
      sortBy: params.get('sortBy') != null ? params.get('sortBy') as SortValue : null,
      type: params.get('type') != null ? params.get('type') as TypeDto : null,
    };
  }

  /**
   * Remove search param.
   * @param key Key to delete.
   */
  export function removeParam(key: string): void {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    window.history.pushState({}, HOME_URL, `?${params.toString()}`);
  }
}
