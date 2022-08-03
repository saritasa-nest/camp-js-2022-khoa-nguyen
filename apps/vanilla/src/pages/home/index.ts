import { getInitialQueryParams } from '../../scripts/initAnimeTable';
import { renderSortingAndOrdering } from '../../scripts/renderSortingAndOrdering';

/** Render anime table. */
function renderAnimeTable(): void {
  renderListOnActivePage(getInitialQueryParams());
  renderSortingAndOrdering();
}

renderAnimeTable();
