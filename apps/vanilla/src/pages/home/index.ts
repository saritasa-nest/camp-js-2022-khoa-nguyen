import { getInitialQueryParams } from '../../scripts/initAnimeTable';
import { renderListOnActivePage } from '../../scripts/renderPagination';
import { renderSortingAndOrdering } from '../../scripts/renderSortingAndOrdering';

/** Render anime table. */
function renderAnimeTable(): void {
  renderListOnActivePage(getInitialQueryParams());
  renderSortingAndOrdering();
}

renderAnimeTable();
