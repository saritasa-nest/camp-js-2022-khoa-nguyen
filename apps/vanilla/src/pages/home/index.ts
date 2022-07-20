import { INITIAL_PAGINATION } from '../../scripts/initAnimeTable';
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
  renderListOnActivePage(INITIAL_PAGINATION);
  renderSortingAndOrdering();
  renderFilterByType();
  renderSearchingAndHandle();
}

renderAnimeTable();
