
import { getInitialQueryParams } from '../../scripts/initAnimeTable';

/** Search param interface. */
interface SearchParam {

  /** Active page. */
  page: string;

  /** Search value. */
  search: string;

  /** Ordering. */
  ordering: string;

  /** Sort by. */
  sortBy: string;

  /** Filter by type. */
  type: string;
}

export namespace SearchParamsService {

  /** Tranforms anime list querry options to search param. */
  export function AnimeListQueryOptionsToSearchParam(): SearchParam {
    const options = getInitialQueryParams();
    return {
      page: options.activePage.toString(),
      search: options.search,
      ordering: options.sorting.isAscending ? 'asc' : 'des',
      sortBy: options.sorting.value,
      type: options.type,
    };
  }
}
