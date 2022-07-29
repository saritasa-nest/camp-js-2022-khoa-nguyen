import { getInitialQueryParams } from '../../scripts/initAnimeTable';
import { renderFilterByType } from '../../scripts/renderFilterByType';
import { renderHeader } from '../../scripts/renderHeader';
import { renderListOnActivePage } from '../../scripts/renderPagination';
import { renderSearchingAndHandle } from '../../scripts/renderSearching';
import { renderSortingAndOrdering } from '../../scripts/renderSortingAndOrdering';

/** Render anime table. */
function renderAnimeTable(): void {
  renderHeader();
  renderListOnActivePage(getInitialQueryParams());
  renderSortingAndOrdering();
  renderFilterByType();
  renderSearchingAndHandle();
}

renderAnimeTable();
