import { HOME_URL } from '../../constants';
import { getInitialQueryParams } from '../../scripts/initAnimeTable';
import { renderFilterByType } from '../../scripts/renderFilterByType';
import { renderHeader } from '../../scripts/renderHeader';
import { renderListOnActivePage } from '../../scripts/renderPagination';
import { renderSearchingAndHandle } from '../../scripts/renderSearching';
import { renderSortingAndOrdering } from '../../scripts/renderSortingAndOrdering';
import { LocalStorageService } from '../../services/localStore';

/** Render anime table. */
function renderAnimeTable(): void {
  LocalStorageService.clear();
  renderHeader();
  renderListOnActivePage(getInitialQueryParams());
  renderSortingAndOrdering();
  renderFilterByType();
  renderSearchingAndHandle();
}

renderAnimeTable();

/** Demo search param. */
function demoSearchParam(): void {
  const searchParam = { offset: 'Demo', limit: 'Test' };
  const params = new URLSearchParams(searchParam);
  console.log(params.toString());
  window.history.pushState({}, HOME_URL, `?${params.toString()}`);
}

demoSearchParam();
