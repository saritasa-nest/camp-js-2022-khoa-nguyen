
import { TypeDto } from '@js-camp/core/dtos/anime.dto';
import { SortValue } from '@js-camp/core/models/sorting';

import { HOME_URL, KEY_ACTIVE_PAGE, KEY_ORDER, KEY_SEARCHING, KEY_SORTING, KEY_TYPE } from '../../constants';

/** Search param interface. */
interface SearchParam {

  /** Active page. */
  readonly page: number | null;

  /** Search value. */
  readonly search: string | null;

  /** Ordering. */
  readonly ordering: string | null;

  /** Sort by. */
  readonly sortBy: SortValue | null;

  /** Filter by type. */
  readonly type: TypeDto | null;
}

export namespace SearchParamsService {

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
      page: params.get(KEY_ACTIVE_PAGE) != null ? Number(params.get(KEY_ACTIVE_PAGE)) : null,
      search: params.get(KEY_SEARCHING),
      ordering: params.get(KEY_ORDER),
      sortBy: params.get(KEY_SORTING) != null ? params.get(KEY_SORTING) as SortValue : null,
      type: params.get(KEY_TYPE) != null ? params.get(KEY_TYPE) as TypeDto : null,
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
