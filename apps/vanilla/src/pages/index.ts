import { getInitialQueryParams } from '../scripts/initAnimeTable';
import { renderFilterByType } from '../scripts/renderFilterByType';
import { renderListOnActivePage } from '../scripts/renderPagination';
import { renderSortingAndOrdering } from '../scripts/renderSortingAndOrdering';

/** Render anime table. */
function renderAnimeTable(): void {
  renderListOnActivePage(getInitialQueryParams());
  renderSortingAndOrdering();
  renderFilterByType();
}

renderAnimeTable();
